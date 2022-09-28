var pos = document.getElementById("pos"); 

var ip = document.getElementById("ip"); 
var loc = document.getElementById("loc"); 
var time = document.getElementById("time"); 
var isp = document.getElementById("isp"); 

const load = document.getElementById("load");

window.addEventListener('load', () => {
	setTimeout(()=>{
		load.classList.add('hide');
		setTimeout(()=>{
			load.style.display = 'none';
		}, 500);
	}, 2000);
})

function ips(data) {
	ip.textContent = data.ip_address;
	loc.textContent = data.country;
	if (!(data.region === null)) {
		loc.textContent = data.country +", "+data.region;
		if (!(data.city === null)) {
			loc.textContent = data.country +", "+data.region +", "+data.city;
		}
	}
	time.textContent = data.timezone;
	if (!(data.postal_code === null)) {
		isp.textContent = data.postal_code;
	}else {
		isp.textContent = "Pas de code postal";
	}
}

async function getIpClient() {
	try {
		var response = await axios.get('https://api.ipify.org?format=json');
		$.ajax({
			url: "https://api.ipfind.com/?ip=" + encodeURI(response.data.ip),
			dataType: 'json',      
			success: function(data){
				ips(data);
				
				let map = L.map('map').setView([data.latitude, data.longitude], 10);
				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				var marker = L.marker([data.latitude, data.longitude]).addTo(map);
			},
			error : function(error){
				console.log('error', error);
			}
		});
	} catch (error) {
		alert("une erreur dans la recuperation de votre adresse ip");
	}
}
getIpClient();

var frm = document.getElementById("frm")
frm.addEventListener("click", function (e) {
	e.preventDefault();

	if (pos.value !== "") {
		$.ajax({
			url: "https://api.ipfind.com/?ip=" + encodeURI(pos.value),
			dataType: 'json',      
			success: function(data){
				ips(data);

				var map1 =document.getElementById("map");
				var hea =document.getElementById("hea");
				map1.remove();
				var map1 = document.createElement("div");
				map1.setAttribute("id","map");
				hea.appendChild(map1);



				let map = L.map('map').setView([data.latitude, data.longitude], 10);
				L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
					attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				}).addTo(map);
				var marker = L.marker([data.latitude, data.longitude]).addTo(map);
			},
			error : function(error){
				alert('error', error);
			}
		});
		pos.value="";
	}
});
