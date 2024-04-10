var array1 = [12, 34, 56, 12, 67]
var array2 = ['js', 'java', 'c#', 'python']

// Todas as funções devem ser implementadas sem efeitos colaterais, isto é,
// elas não devem modificar o array de entrada (não são in-place).

function first(arr, limit = 0) {
    let result = [];
    if (limit === 0) return arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (limit < i + 1) break;
        result.push(arr[i])
    }
    return result;
}
function last(arr, limit = 0) {
    let result = [];
    if (limit == 0) return arr[arr.length - 1];
    for (let i = arr.length - 1; i > 0; i--) {
        if (limit - 1 > i) break
        result.unshift(arr[i]);
    }
    return result;
}
function tail(arr) {
    return [...arr].slice(1);
}
function without(array, elementToRemove) {
    return [...array].filter((n) => n != elementToRemove);
}
function union(...args) {
    let hashMap = {};
    let array = [];
    args.forEach(arr => {
        arr.forEach(elem => {
            if (!hashMap[elem]) array.push(elem);
            hashMap[elem] = 1;
        });
    });
    return array;
}
function unique(arr) {
    let hashMap = {};
    let array = [];
    arr.forEach(elem => {
        if (!hashMap[elem]) array.push(elem);
        hashMap[elem] = 1;
    })
    return array;
}
function intersection(arr1, arr2) {
    let hashMap = {};
    let array = [];
    arr2.forEach(elem => {
        if (!hashMap[elem]) hashMap[elem] = 1;
    });
    arr1.forEach(elem => {
        if (hashMap[elem] == 1) {
            array.push(elem)
            hashMap[elem]++;
        };
    })
    return array;
}
function difference(arr1, arr2) {
    let hashMap = {};
    let array = [];
    arr1.forEach(elem => {
        if (!hashMap[elem]) hashMap[elem] = 1;
    });
    arr2.forEach(elem => {
        if (hashMap[elem]) {
            hashMap[elem]++;
        }
    });
    arr1.forEach(elem => {
        if (hashMap[elem] == 1) array.push(elem);
    });

    return array;
}
function zip(...args) {
    let array = [];
    let arrOriginalSize = args[0].length;
    for (let i = 0; i < arrOriginalSize; i++) {
        let zipArray = [];
        for (let j = 0; j < args.length; j++) {
            zipArray.push(args[j][i]);
        }
        array.push(zipArray);
    }
    return array;
}
function compact(array) {
    let newArr = [];
    for (let i = 0; i < array.length; i++) {
        if (array[i] != null && !isNaN(array[i]) && array[i] != undefined) newArr.push(array[i]);
    }
    return newArr;

}
function flatten(array, depth = 1) {
    let newArr = [];
    array.forEach(element => {
        if (Array.isArray(element) && depth > 0) {
            newArr.push(...flatten(element, depth - 1));
        }
        else {
            newArr.push(element);
        }
    });
    return newArr;
}
function equals(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
        if (Array.isArray(arr1[i])) {
            if (equals(arr1[i], arr2[i]) == false) return false;
        } else if (arr1[i] != arr2[i]) return false;
    }
    return true;
}

console.log(first(array1)) // 12
console.log(first(array1, 3)) // [12, 34, 56]
console.log(first([], 3)) // []

console.log(last(array1)) // 67
console.log(last(array1, 3)) // [56, 12, 67]

console.log(tail(array1)) // [34, 56, 12, 67]
console.log(tail([])) // []

console.log(without(array1, 34)) // [12, 56, 12, 67]
console.log(without(array1, 12)) // [34, 56, 67]

console.log(union(array1, array2)) // [12, 34, 56, 67, 'js', 'java', 'c#', 'python']
console.log(union(array1, array2, [89, 34, 'ruby', 'js'])) // [12, 34, 56, 67, 'js', 'java', 'c#', 'python', 89, 'ruby']

console.log(unique(array1)) // [12, 34, 56, 67]
console.log(unique(['a', 'a', 'a'])) // []
console.log(unique(['a', 'b', 'a', 'b'])) // ['a', 'b']

console.log(intersection(['a', 4, 'c', 8], [8, 'b', 'c', 34])) // ['c', 8]
console.log(intersection([8, 'a', 4, 'c', 8], [8, 'b', 'c', 34])) // [8, 'c']

console.log(difference(['a', 4, 'c', 8], [8, 'b', 'c', 34])) // ['a', 4, 'b', 34]
console.log(difference([], array1)) // []
console.log(difference(array1, [])) // [12, 34, 56, 12, 67]
console.log(difference(array1, array2)) // [12, 34, 56, 12, 67]
console.log(difference(array1, [56, 67])) // [12, 34, 12]

console.log(zip([12, 45], [67, 90])) // [[12, 67], [45, 90]]
console.log(zip(array2, [67, 90, 52, 56])) // [['js', 67], ['java', 90], ['c#', 52], ['python', 56]]
console.log(zip(array1, [67, 90, 52, 56], ['brendan eich', 'james gosling', 'anders hejlsberg', 'guido van rossum']))
// [['js', 67, 'brendan eich'], ['java', 90, 'james gosling'], ['c#', 52, 'anders hejlsberg'], ['python', 56, 'guido van rossum']]
console.log(zip([12, 45, 89], [67, 90])) // [[12, 67], [45, 90], [89, undefined]]
console.log(zip([12, 45])) // [[12], [45]]

console.log(compact([45, 23])) // [45, 23]
console.log(compact([45, 23, null])) // [45, 23]
console.log(compact([NaN, 23, null, 12])) // [23, 12]
console.log(compact([NaN, 23, null, 12, undefined, 78])) // [23, 12, 78]
console.log(compact([NaN, 23, null, 12, undefined, 78, 0, false, ''])) // [23, 12, 78, 0, false, '']
console.log(compact(array1)) // [12, 34, 56, 12, 67]

var depth = 2 // profundidade
var nested = [34, 54, [45, 23, [78, 90, [65]]], 12]
console.log(flatten([34, 54, [45, 23], 12])) // [34, 54, 45, 23, 12]
console.log(flatten([34, 54, [45, 23], 12, [78, 90]])) // [34, 54, 45, 23, 12, 78, 90]
console.log(flatten([34, 54, [45, 23, [78, 90]], 12])) // [34, 54, 45, 23, [78, 90], 12]
console.log(flatten([34, 54, [45, 23, [78, 90]], 12], depth)) // [34, 54, 45, 23, 78, 90, 12]
console.log(flatten(nested, depth)) // [34, 54, 45, 23, 78, 90, [65], 12]
console.log(flatten(nested, 3)) // [34, 54, 45, 23, 78, 90, 65, 12]
console.log(flatten(array1)) // [12, 34, 56, 12, 67]

console.log(equals([1, 2, 3], [1, 2, 3])) // true
console.log(equals([1, 2, 3], [1, 3, 2])) // false
console.log(equals(array1, array2)) // false
console.log(equals([1, [2, 3], 4], [1, [2, 3], 4])) // true
console.log(equals([1, [2, 3], 4], [1, [3, 2], 4])) // false
console.log(equals(nested, nested)) // true
console.log(equals(nested, [34, 54, [45, 23, [78, 90, [65]]], 12])) // true
console.log(equals([34, 54, [45, 23, [78, 90, [65]]], 12], nested)) // true

console.log(array1) // [12, 34, 56, 78, 910]
console.log(array2) // ['js', 'java', 'c#', 'python']
