startScript();

function startScript() {
	checkLeague();
	checkLocalData();
	beginPriceAnalysis();
}

function checkLocalData() {

	var divinationResponse = localStorage.getItem('divinationResponse');

		// valid, or more than 15 minutes has elapsed
	if (divinationResponse == null || checkTime()) {
		console.log('Divination JSON not found.');
		console.log('Creating new request');
		var ninjaDivination = new XMLHttpRequest();
		ninjaDivination.open('GET', ('https://poe.ninja/api/Data/GetDivinationCardOverview?league=' + league));
		ninjaDivination.responseType = 'json';
		ninjaDivination.send();

		ninjaDivination.onreadystatechange = function() {
		    if (this.readyState == 4 && this.status == 200) {
		      	divinationResponse = JSON.stringify(this.response);
		      	localStorage.setItem('divinationResponse', divinationResponse);
		    }
		}
	}
	else {
		console.log('Divination JSON found.');
	}

	
}

// function getFileData() {
// 	var myBlob = new Blob(['ninja.txt'], {type : 'text/plain'});

// 	var reader = new FileReader();
//         reader.onload = (function(reader)
//         {
//             return function()
//             {
//                 var contents = reader.result;
//                 var lines = contents.split('\n');
//                 //////
//                 document.getElementById('container').innerHTML=contents;
//             }
//         })(reader);

//     reader.readAsText(myBlob);
// 	// reader.addEventListener("loadend", function() {
//  //   // reader.result contains the contents of blob as a typed array
//  //   // we insert content of file in DOM here
//  //   		console.log(this.result);
//  //   		console.log(document.getElementById('text'));
// 	// });

// 	//console.log(text);
// 	return 'meow';
// }


function checkLeague() {
	// This should be replaced with a user selection
	var league = localStorage.getItem('currentLeague');

	if (league == null) {
		localStorage.setItem('currentLeague','Betrayal');
		league = localStorage.getItem('currentLeague');
	}
	$(function(){$('#league').text(league);});
}


function beginPriceAnalysis(stringifiedJSON) {

	parsedJSON = JSON.parse(stringifiedJSON);
	console.log(parsedJSON);
	//$(function(){$('#dump').text(response);});
}

// Return true if more than 15 minutes has elapsed.
function checkTime() {
	console.log('Checking how much time has elapsed since last poe.ninja api call');
	result = false;

	time = new Date();
	var currentTime = time.getTime();
	var previousTime = localStorage.getItem('time');
	console.log('Previous Time:', previousTime);
	console.log('Current Time:', currentTime);


	// If there is not a value within localStorage
	if (previousTime == null) {
		localStorage.setItem('time', currentTime);
	}
	else {

		// 36000 miliseconds is 15 minutes
		if (previousTime - currentTime > 36000) {
			console.log('More than 15 minutes has elapsed.')
			localStorage.setItem('time', currentTime);
			result = true;
		}
		else {
			console.log('Less than 15 minutes has elapsed.')
		}
	}

	return result;
}


// var ninjaAccessory = new XMLHttpRequest();
// var ninjaArmour = new XMLHttpRequest();
// var ninjaFlask = new XMLHttpRequest();
// var ninjaJewel = new XMLHttpRequest();
// var ninjaWeapon = new XMLHttpRequest();

//https://poe.ninja/api/Data/GetCurrencyOverview?league=Betrayal
//https://poe.ninja/api/Data/GetDivinationCardOverview?league=Betrayal

// ninjaAccessory.open('GET', ('https://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=' + league));
// ninjaAccessory.responseType = 'json';
// ninjaAccessory.send();

// ninjaArmour.open('GET', ('https://poe.ninja/api/Data/GetUniqueArmourOverview?league=' + league));
// ninjaArmour.responseType = 'json';
// ninjaArmour.send();

// ninjaFlask.open('GET', ('https://poe.ninja/api/Data/GetUniqueFlaskOverview?league=' + league));
// ninjaFlask.responseType = 'json';
// ninjaFlask.send();

// ninjaJewel.open('GET', ('https://poe.ninja/api/Data/GetUniqueJewelOverview?league=' + league));
// ninjaJewel.responseType = 'json';
// ninjaJewel.send();

// ninjaWeapon.open('GET', ('https://poe.ninja/api/Data/GetUniqueWeaponOverview?league=' + league));
// ninjaWeapon.responseType = 'json';
// ninjaWeapon.send();

// 	setTimeout(function() {
// 	    if ((ninjaAccessory.readyState == 4 && ninjaAccessory.status == 200) 
// 	        && (ninjaCharacter.readyState == 4 && ninjaCharacter.status == 200)) {
// 	        	console.log('We are ready!');
// 	        //Most definitely an acceptable length
// 	        var cost = calculateCharacterCost(ninjaAccessory.response, ninjaArmour.response, ninjaFlask.response, ninjaWeapon.response, ninjaCharacter.response);
// 	        cost += calculateJewelCost(ninjaJewel.response, ninjaCharacter.response);
// 	        costString = cost + ' chaos';

// 	        $(function(){$('#totalCost').text(costString);});
// 	        console.log('Estimated cost: ', cost, 'chaos');
// 	    }
// 	    else {
// 	        console.log('We are not ready!');
// 	    }
// 	}, 2000);





// function getNames(url) {


// 	var accountName = ''; 
// 	var characterName = '';

// 	//example:
// 	//https://poe.ninja/challenge/builds/char/xPazam/PaZam_xxx?i=0
// 	var startIndex = url.indexOf('char');
// 	startIndex = url.indexOf('/', startIndex) + 1;
// 	endIndex = url.indexOf('/', startIndex);
// 	accountName = url.substring(startIndex, endIndex);
// 	startIndex = endIndex + 1;
// 	endIndex = url.indexOf('?', startIndex);

// 	if (endIndex == -1) {
// 		characterName = url.substring(startIndex);
// 	}
// 	else {
// 		characterName = url.substring(startIndex, endIndex);
// 	}


// 	return [accountName, characterName];
// }

// function calculateJewelCost(jewelPrices, jewels) {

// 	var totalChaos = 0;
// 	var itemValue = 0;
// 	var numOfJewels = Object.keys(jewels['jewels']).length;
// 	var jewelPricesLength = Object.keys(jewelPrices['lines']).length;
// 	var jewelIndex = 0;
// 	var itemName;
// 	var itemClass;
// 	var itemImgUrl;

// 	for (var i = 0; i < numOfJewels; i++){
// 		console.log('___________________________________');
// 		itemName = jewels['jewels'][i]['itemData']['name'];
// 		itemSlot = jewels['jewels'][i]['itemSlot'];
// 		itemClass = jewels['jewels'][i]['itemClass'];
// 		itemImgUrl = jewels['jewels'][i]['itemData']['icon'];

// 		// 3 means it is of 'unique item' type
// 		if (itemClass == 3) {
// 			for (var j = 0; j < jewelPricesLength; j++) {
// 				if (itemName == jewelPrices['lines'][j]['name']){
// 					console.log(itemName, 'found.');
// 					console.log('poe.ninja prices: ', jewelPrices['lines'][j]['chaosValue']);
// 					itemValue = jewelPrices['lines'][j]['chaosValue'];
// 					totalChaos += itemValue;
// 				}
// 			}
// 		}
// 		else {
// 			console.log(itemName, 'is a rare jewel.');
// 			console.log('A later version will support price estimation for rare jewels.');
// 		}

// 		jewelIndex = i + 1;
// 		updateHTML(itemSlot, itemName, itemClass, itemImgUrl, itemValue, jewelIndex);
// 	}

// 	return totalChaos;
// }

// function calculateCharacterCost(accessoryPrice, armourPrice, flaskPrice, weaponPrice, inventory) {

//     var totalChaos = 0;
//     var numOfInventoryItems = Object.keys(inventory['items']).length;
//     var numOfFlasks = Object.keys(inventory['flasks']).length;
//     var item;
//     var itemName;
//     var itemType;
//     var itemSlot;
//     var itemClass;
//     var itemImgUrl;
// 	var itemValue;
// 	var flaskIndex = 0;

//     for (var i = 0; i < numOfInventoryItems; i++) {
// 		//var item = Object.entries(inventory['items'])[i];
//         item = inventory['items'][i]['itemData'];
//         itemName = inventory['items'][i]['itemData']['name'];
//         itemType = Object.keys(inventory['items'][i]['itemData']['category'])[0];
//         itemSlot = inventory['items'][i]['itemSlot'];
//         itemClass = inventory['items'][i]['itemClass'];
//         itemImgUrl = inventory['items'][i]['itemData']['icon'];

//         console.log(item, itemName, itemType);

//         // This condition will not be necessary once prices of rare items 
//         // can be estimated. Until then, we shall skip them.
//         if (itemName == undefined){
//             console.log('Rare Item', itemType)
//         }
//         else {
//             //console.log(item, itemType, item[1]['name'])
//             itemValue = 0;

//             var success = true;

//             if (itemType == 'accessories'){
//                 itemValue = findInventoryItemCost(accessoryPrice, item, itemType);
//             }
//             else if (itemType == 'armour'){
//                 itemValue = findInventoryItemCost(armourPrice, item, itemType);
//             }
//             else if (itemType == 'weapons'){
//                 itemValue = findInventoryItemCost(weaponPrice, item, itemType);
//             }
//             else {
//                 console.log('Unknown item type. FeelsBadMan');
//                 success = false;
//             }

//             if (success) {
//             	totalChaos += itemValue;
//             	updateHTML(itemSlot, itemName, itemClass, itemImgUrl, itemValue, flaskIndex);
//             }

//         }
//     }

//     for (var i = 0; i < numOfFlasks; i++){
//     	itemValue = 0;
//     	item = inventory['flasks'][i]['itemData'];
//         itemType = Object.keys(inventory['flasks'][i]['itemData']['category'])[0];
//         itemSlot = inventory['flasks'][i]['itemSlot'];
//         itemImgUrl = inventory['flasks'][i]['itemData']['icon'];
//         itemClass = inventory['flasks'][i]['itemClass'];

//         if (itemClass == 3){
//         	itemName = inventory['flasks'][i]['itemData']['name'];
//         }
//         else{
//         	itemName = inventory['flasks'][i]['itemData']['typeLine'];
//         }

// 		itemValue = findInventoryItemCost(flaskPrice, item, itemType);
// 		flaskIndex = i + 1;
// 		updateHTML(itemSlot, itemName, itemClass, itemImgUrl, itemValue, flaskIndex);
// 		totalChaos += itemValue;
           
//     }
//     return totalChaos;
// }

// function findInventoryItemCost(itemList, item, itemType) {

// 	console.log('___________________________________');
// 	console.log(item['name']);

// 	// For itemList
// 	var chaosValue = 0;
//     var numOfItems = Object.keys(itemList['lines']).length;

//     // For item
// 	var numOfSockets = 0;
// 	var numOfLinks = 0;
// 	var socketGroup = 0;
// 	var numOfAbyss = 0;

// 	try {
// 		numOfSockets = Object.keys(item['sockets']).length;
// 		console.log('num of sockets:', numOfSockets);
// 		if (numOfSockets >= 5 && item['sockets'][1]['group'] == 1){
// 			socketGroup = 1;
// 		}

// 		for (var i = 0; i < numOfSockets; i++) {
// 			if (item['sockets'][i]['group'] == socketGroup) {
// 				numOfLinks += 1;
// 			}

// 			if (item['sockets'][i]['attr'] == 'A') {
// 				numOfAbyss += 1;
// 			}
// 		}

// 		console.log('Number of links:', numOfLinks);
// 		console.log('Number of abyss sockets:', numOfAbyss);
// 	}
// 	catch {
// 		console.log('Item has no sockets.');
// 	}

//     for (var i = 0; i < numOfItems; i++){
//         if (itemList['lines'][i]['name'] == item['name']) {

//         	console.log('Index = ', i);

//         	// Check if it has abyss sockets
//         	var abyssSockets = parseInt(itemList['lines'][i]['variant'], 10);
//         	console.log('Item we\'re searching against has ', abyssSockets, 'sockets.');

//         	// Checking Abyssal sockets first. Gloves, boots, and helmets may have up to 2.
//         	if (numOfAbyss == abyssSockets) {
//         			chaosValue = itemList['lines'][i]['chaosValue'];
//         			break;
//             		console.log('Chaos value of', item['name'], ' = ', chaosValue);
//         		}

//         	else if ((itemType == 'armour' || itemType == 'weapons') && numOfLinks >= 5) {

//         		if (itemList['lines'][i]['links'] == numOfLinks) {
//         			chaosValue = itemList['lines'][i]['chaosValue'];
//         			break;
//             		console.log('Chaos value of', item['name'], ' = ', chaosValue);
//         		}
//         	}
//         	else {
//         		console.log(i, itemList['lines'][i]['id'], itemList['lines'][i]['chaosValue']);
//             	chaosValue = itemList['lines'][i]['chaosValue'];
//             	console.log('Chaos value of', item['name'], ' = ', chaosValue);

//         	}
//         }
//     }

//     console.log('Chaos predicted: ', chaosValue);
//     console.log('___________________________________');
//     return chaosValue;
// }

// function updateHTML(itemSlot, itemName, itemClass, url, value, index) {


// 	var id = '';
// 	var imgId = '';

// 	switch(itemSlot) {
// 		case 1:
// 			id = '#helmet';
// 			break;
// 		case 2:
// 			id = '#gloves';
// 			break;
// 		case 3:
// 			id = '#armour';
// 			break;
// 		case 4:
// 			id = '#amulet';
// 			break;
// 		case 5:
// 			id = '#boots';
// 			break;
// 		case 6:
// 			id = '#offhand';
// 			break;
// 		case 7:
// 			id = '#mainhand';
// 			break;
// 		case 8:
// 			id = '#ring1';
// 			break;
// 		case 9:
// 			id = '#ring2';
// 			break;
// 		case 10:
// 			id = '#belt';
// 			break;
// 		case 11:
// 		case 12:
// 			id = '#jewel' + index;
// 			break;
// 		case 13:
// 			id = '#flask' + index;
// 			break;
// 		default:
// 	}

// 	switch (itemClass){
// 		case 0:
// 			itemName += ' ( normal item )';
// 			break;
// 		case 1:
// 			itemName += ' ( magic item )';
// 			break;
// 		case 2:
// 			itemName += ' ( rare item )';
// 			break;
// 		case 3:
// 			itemName += ' (' + value + ')';
// 			break;
// 		default:
// 	}

// 	imgId = id + 'Img';

// 	console.log('************************');
// 	console.log(itemSlot, itemName, url);
// 	console.log(id, imgId);
// 	console.log('************************');


// 	$(function(){$(id).text(itemName);});
// 	$(function(){$(imgId).attr('src', url);});

// }



