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

// console.log(defarent(arr1, arr2));

function generate(rowIndex) {
	rowIndex += 1;
	let arr = [];
	if (rowIndex) {
		for (let i = 1; i <= rowIndex; i++) {
			if (i === 1) {
				arr.push([1]);
			} else {
				arr.push([]);
			}
		}
	}
	arr.forEach((v, i) => {
		let next = arr[i + 1];
		let newArr = [0, ...v, 0];
		if (next) {
			newArr.forEach((value, index) => {
				if (newArr[index + 1] !== undefined) {
					let total = newArr[index] + newArr[index + 1];
					next.push(total);
				}
			});
		}
	});
	return arr[rowIndex - 1];
}
// console.log(generate(3));

// [7,1,5,3,6,4]  [2,4,7,1,2,3]
function maxProfit(prices) {
	let max = Math.max.apply(null, prices);
	let min = Math.min.apply(null, prices);
	let minIndex = prices.indexOf(min);
	let maxIndex = prices.indexOf(max);
	if (max === min || minIndex === maxIndex) {
		return 0;
	}
	if (maxIndex > minIndex) {
		return max - min;
	}
	if (minIndex > maxIndex) {
		let maxnum = 0;
		let minnum = 0;
		if (maxIndex !== 0) {
			let maxArr = prices.slice(0, maxIndex + 1);
			maxnum = maxProfit(maxArr);
		}
		if (minIndex !== prices.length - 1) {
			let minArr = prices.slice(minIndex);
			minnum = maxProfit(minArr);
		}
		if (maxIndex === 0) {
			let newArr = prices.slice(maxIndex + 1);
			return maxProfit(newArr);
		}
		if (minIndex === prices.length - 1) {
			let newArr = prices.slice(0, minIndex);
			return maxProfit(newArr);
		}
		return Math.max(maxnum, minnum);
	}
}

let num = maxProfit([11, 2, 7, 1, 4]);
console.log('xxx=', num);
