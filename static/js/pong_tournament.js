let table;
table = document.getElementById("p1");
user_1 = table.getAttribute('data-name');
user_1_status = table.getAttribute('data-status');
user_1_score = table.getAttribute('data-score');

table = document.getElementById("p2");
user_2 = table.getAttribute('data-name');
user_2_status = table.getAttribute('data-status');
user_2_score = table.getAttribute('data-score');

table = document.getElementById("p3");
user_3 = table.getAttribute('data-name');
user_3_status = table.getAttribute('data-status');
user_3_score = table.getAttribute('data-score');

table = document.getElementById("p4");
user_4 = table.getAttribute('data-name');
user_4_status = table.getAttribute('data-status');
user_4_score = table.getAttribute('data-score');

user_5 = null;
user_5_status = 0;
user_5_score = 0;
user_6 = null;
user_6_status = 0;
user_6_score = 0;
user_7 = null;
user_7_status = 0;
user_7_score = 0;
user_8 = null;
user_8_status = 0;
user_8_score = 0;

if (document.getElementById("pong_tournament_big"))
{
	table = document.getElementById("p5");
	user_5 = table.getAttribute('data-name');
	user_5_status = table.getAttribute('data-status');
	user_5_score = table.getAttribute('data-score');
	
	table = document.getElementById("p6");
	user_6 = table.getAttribute('data-name');
	user_6_status = table.getAttribute('data-status');
	user_6_score = table.getAttribute('data-score');
	
	table = document.getElementById("p7");
	user_7 = table.getAttribute('data-name');
	user_7_status = table.getAttribute('data-status');
	user_7_score = table.getAttribute('data-score');
	
	table = document.getElementById("p8");
	user_8 = table.getAttribute('data-name');
	user_8_status = table.getAttribute('data-status');
	user_8_score = table.getAttribute('data-score');
}

let round2_p1 = "???";	//Last round for 4P
let round2_p2 = "???";	//Last round for 4P
let round2_p3 = "???";	//Only exists on 8P
let round2_p4 = "???";	//Only exists on 8P
let round3_p1 = "???";	//Only exists on 8P
let round3_p2 = "???";	//Only exists on 8P

// Checking if 4P or 8P
knockouts = 0;
if (user_1_status === "0")
	knockouts += 1;
if (user_2_status === "0")
	knockouts += 1;
if (user_3_status === "0")
	knockouts += 1;
if (user_4_status === "0")
	knockouts += 1;
if (document.getElementById("pong_tournament_big"))
{
	if (user_5_status === "0")
		knockouts += 1;
	if (user_6_status === "0")
		knockouts += 1;
	if (user_7_status === "0")
		knockouts += 1;
	if (user_8_status === "0")
		knockouts += 1;
}

playmode = 1;
if (document.getElementById("pong_tournament_big"))
	playmode = 2;

round_id = 1;
if (playmode === 1)
{
	if (knockouts > 1)
	{
		round_id = 2;
		if (user_1_score != "0")
			round2_p1 = user_1;
		else
			round2_p1 = user_2;
		if (user_3_score != "0")
			round2_p2 = user_3;
		else
			round2_p2 = user_4;
	}
	if (knockouts > 2)
	{
		round_id = 3;
		if (user_1_score === "2")
			round3_p1 = user_1;
		else if (user_2_score === "2")
			round3_p1 = user_2;
		else if (user_3_score === "2")
			round3_p1 = user_3;
		else
			round3_p1 = user_4;
	}
}
else if (playmode === 2)
{
	if (knockouts > 3)
	{
		round_id = 2;
		if (user_1_score != "0")
			round2_p1 = user_1;
		else
			round2_p1 = user_2;
		if (user_3_score != "0")
			round2_p2 = user_3;
		else
			round2_p2 = user_4;	
		if (user_5_score != "0")
			round2_p3 = user_5;
		else
			round2_p3 = user_6;
		if (user_7_score != "0")
			round2_p4 = user_7;
		else
			round2_p4 = user_8;
	}
	if (knockouts > 5)
	{
		round_id = 3;
		if (user_1_score === "2" || user_1_score === "3")
			round3_p1 = user_1;
		else if (user_2_score === "2" || user_2_score === "3")
			round3_p1 = user_2;
		else if (user_3_score === "2" || user_3_score === "3")
			round3_p1 = user_3;
		else
			round3_p1 = user_4;
	
		if (user_5_score === "2" || user_5_score === "3")
			round3_p2 = user_5;
		else if (user_6_score === "2" || user_6_score === "3")
			round3_p2 = user_6;
		else if (user_7_score === "2" || user_7_score === "3")
			round3_p2 = user_7;
		else
			round3_p2 = user_8;
	}
}

// Initialize tournament and context
tournament = null;
if (document.getElementById("pong_tournament_small"))
	tournament = document.getElementById("pong_tournament_small");
if (document.getElementById("pong_tournament_big"))
	tournament = document.getElementById("pong_tournament_big");

const ctx = tournament.getContext("2d");
tournament.width = 1000;
tournament.height = 600;

// Draw the names on the table/tree
function draw() {
  ctx.clearRect(0, 0, tournament.width, tournament.height);

  //ctx.fillStyle = "black";
  ctx.font = "30px Poppins";
  
  if (user_1_status === "0" && user_1_score === "0")
	  ctx.fillStyle = "red";
  else if (user_1_score != '0')
	  ctx.fillStyle = "green";
  else
	  ctx.fillStyle = "black";
  ctx.fillText(user_1, 20, tournament.height - 55);
  
  if (user_2_status === "0" && user_2_score === "0")
	  ctx.fillStyle = "red";
  else if (user_2_score != '0')
	  ctx.fillStyle = "green";
  else
	  ctx.fillStyle = "black";
  ctx.fillText(user_2, 290, tournament.height - 55);
  
  if (user_3_status === "0" && user_3_score === "0")
	  ctx.fillStyle = "red";
  else if (user_3_score != "0")
	  ctx.fillStyle = "green";
  else
	  ctx.fillStyle = "black";
  ctx.fillText(user_3, 520, tournament.height - 55);
  
  if (user_4_status === "0" && user_4_score === "0")
	  ctx.fillStyle = "red";
  else if (user_4_score != "0")
	  ctx.fillStyle = "green";
  else
	  ctx.fillStyle = "black";
  ctx.fillText(user_4, 790, tournament.height - 55);

  if (round_id > 1)
  {
	  if (user_1_score != "0")
	  {
		  if (user_1_status === "0" && user_1_score === "1")
			  ctx.fillStyle = "red";
		  else if (user_1_score === "2" || user_1_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
	  }
	  else
	  {
		  if (user_2_status === "0" && user_2_score === "1")
			  ctx.fillStyle = "red";
		  else if (user_2_score === "2" || user_2_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
	  }
	  ctx.fillText(round2_p1, 155, tournament.height - 170);
	  
	  if (user_3_score != "0")
	  {
		  if (user_3_status === "0" && user_3_score === "1")
			  ctx.fillStyle = "red";
		  else if (user_3_score === "2" || user_3_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
	  }
	  else
	  {
		  if (user_4_status === "0" && user_4_score === "1")
			  ctx.fillStyle = "red";
		  else if (user_4_score === "2" || user_4_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
	  }	  
	  ctx.fillText(round2_p2, 655, tournament.height - 170);
	  
	if (document.getElementById("pong_tournament_small") && round_id === 3)
	{
		ctx.fillStyle = "green";
		ctx.fillText(round3_p1, 405, tournament.height - 245);
	}
  }
  
  if (document.getElementById("pong_tournament_big"))
  {
	if (user_5_status === "0" && user_5_score === "0")
		ctx.fillStyle = "red";
	else if (user_5_score != "0")
		ctx.fillStyle = "green";
	else
		ctx.fillStyle = "black";
	ctx.fillText(user_5, 20, 70);
	
	if (user_6_status === "0" && user_6_score === "0")
		ctx.fillStyle = "red";
	else if (user_6_score != "0")
		ctx.fillStyle = "green";
	else
		ctx.fillStyle = "black";
	ctx.fillText(user_6, 290, 70);

	if (user_7_status === "0" && user_7_score === "0")
		ctx.fillStyle = "red";
	else if (user_7_score != "0")
		ctx.fillStyle = "green";
	else
		ctx.fillStyle = "black";
	ctx.fillText(user_7, 520, 70);

	if (user_8_status === "0" && user_8_score === "0")
		ctx.fillStyle = "red";
	else if (user_8_score != "0")
		ctx.fillStyle = "green";
	else
		ctx.fillStyle = "black";
	ctx.fillText(user_8, 790, 70);

	if (round_id > 1)
	{
		if (user_5_score != "0")
		{
			if (user_5_status === "0" && user_5_score === "1")
				ctx.fillStyle = "red";
			else if (user_5_score === "2" || user_5_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		else
		{
			if (user_6_status === "0" && user_6_score === "1")
				ctx.fillStyle = "red";
			else if (user_6_score === "2" || user_6_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		ctx.fillText(round2_p3, 155, 185);

		if (user_7_score != "0")
		{
			if (user_7_status === "0" && user_7_score === "1")
				ctx.fillStyle = "red";
			else if (user_7_score === "2" || user_7_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		else
		{
			if (user_8_status === "0" && user_8_score === "1")
				ctx.fillStyle = "red";
			else if (user_8_score === "2" || user_8_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		ctx.fillText(round2_p4, 655, 185);
	}
	if (round_id > 2)
	{
		if (user_1_score === "2" || user_1_score === "3")
		{
		  if (user_1_status === "0" && user_1_score === "2")
			  ctx.fillStyle = "red";
		  else if (user_1_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
		}
		else if (user_2_score === "2" || user_2_score === "3")
		{
		  if (user_2_status === "0" && user_2_score === "2")
			  ctx.fillStyle = "red";
		  else if (user_2_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
		}
		else if (user_3_score === "2" || user_3_score === "3")
		{
			if (user_3_status === "0" && user_3_score === "2")
				ctx.fillStyle = "red";
			else if (user_2_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		else if (user_4_score === "2" || user_4_score === "3")
		{
			if (user_4_status === "0" && user_4_score === "2")
				ctx.fillStyle = "red";
			else if (user_4_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		ctx.fillText(round3_p1, 405, tournament.height - 245);
		
		if (user_5_score === "2" || user_5_score === "3")
		{
		  if (user_5_status === "0" && user_5_score === "2")
			  ctx.fillStyle = "red";
		  else if (user_5_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
		}
		else if (user_6_score === "2" || user_6_score === "3")
		{
		  if (user_6_status === "0" && user_6_score === "2")
			  ctx.fillStyle = "red";
		  else if (user_6_score === "3")
			  ctx.fillStyle = "green";
		  else
			  ctx.fillStyle = "black";
		}
		else if (user_7_score === "2" || user_7_score === "3")
		{
			if (user_7_status === "0" && user_7_score === "2")
				ctx.fillStyle = "red";
			else if (user_7_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}
		else if (user_8_score === "2" || user_8_score === "3")
		{
			if (user_8_status === "0" && user_8_score === "2")
				ctx.fillStyle = "red";
			else if (user_8_score === "3")
				ctx.fillStyle = "green";
			else
				ctx.fillStyle = "black";
		}		
		ctx.fillText(round3_p2, 405, 260);
	}
  }
  if ((playmode === 1 && knockouts === 3) || (playmode === 2 && knockouts === 7))
	{
		ctx.fillStyle = "yellow";
		var lang = localStorage.getItem("language");
		if (playmode === 1)
		{
			ctx.font = "40px Poppins";
			ctx.textAlign = "center";
			if (lang === "de") {
				ctx.fillText("Wir haben einen Sieger!", tournament.width / 2, tournament.height / 2 - 40);
			} else if (lang === "it") {
				ctx.fillText("Abbiamo un vincitore!", tournament.width / 2, tournament.height / 2 - 40);
			} else {
				ctx.fillText("We have a winner!", tournament.width / 2, tournament.height / 2 - 40);
			}	
	
		}
		else if (playmode === 2)
		{
			ctx.font = "30px Poppins";
			if (lang === "de") {
				ctx.fillText("Wir haben einen Sieger!", 620, tournament.height / 2);
			} else if (lang === "it") {
				ctx.fillText("Abbiamo un vincitore!", 630, tournament.height / 2);
			} else {
				ctx.fillText("We have a winner!", 650, tournament.height / 2);
			}
		}
	}
}

let animationId = requestAnimationFrame(draw);