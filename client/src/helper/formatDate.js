const formatDate = (date) => {
	let formatDate = new Date(date);
	return formatDate.toDateString().split(' ').splice(1).join(' ');
};

export default formatDate;
