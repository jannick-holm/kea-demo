import supabaseClient from '../supabaseClient';

const eventTypes = {
	INSERT: 'INSERT',
	DELETE: 'DELETE'
}

function useRealTime() {
	const subscribe = async (table, callback) => {
		await fetchRows(table, null, callback);

		await supabaseClient
			.channel('*')
			.on('postgres_changes', { event: '*', schema: 'public', table }, payload => {
				_handleSubscriptionEvent(payload, callback)
			})
			.subscribe((message) => console.log(message))
	}

	const _handleSubscriptionEvent = (payload, callback) => {
		switch (payload.eventType) {
			case eventTypes.INSERT:
				callback((prevData) => [payload.new, ...prevData])
				break;
			case eventTypes.DELETE:
				callback((prevData) => prevData.filter(item => item.id !== payload.old.id))
				break;
			default:
		}
	}

	const postData = async (table, data) => {
		const { savedData, error } = await supabaseClient
			.from(table)
			.insert(data)

		if(error) {
			console.error(error);
		}

		return savedData;
	}

	const fetchRow = async (table, filter, setCallback) => {
		const {data, error } = await supabaseClient
			.from(table)
			.select()
			.eq(filter.col, filter.val)

		if(error) {
			console.error(error);
		}

		if(!data[0]) {
			console.error('The row was not found');
		}

		setCallback(data[0]);

		return data;
	}

	const fetchRows = async (table, filter, setCallback) => {
		const {data, error } = await supabaseClient
			.from(table)
			.select()

		if(error) {
			console.error(error);
		}

		setCallback(data);

		return data;
	}

	const deleteRow = async (table, filter) => {
		const { error } = await supabaseClient
			.from(table)
			.delete()
			.eq(filter.col, filter.val)

		if(error) {
			console.error(error);
		}
	}

	return { subscribe, postData, fetchRow, fetchRows, deleteRow }
}

export { useRealTime }
