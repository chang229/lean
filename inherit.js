const arr1 = [1, 3, 5, 7];
const arr2 = [1, 2, 3, 4];

function defarent(arr1, arr2) {
	let result = [];
	arr1.forEach((v) => {
		if (arr2.indexOf(v) === -1) {
			result.push(v);
		}
	});
	arr2.forEach((v) => {
		if (arr1.indexOf(v) === -1) {
			result.push(v);
		}
	});
	return result;
}

console.log(defarent(arr1, arr2));
