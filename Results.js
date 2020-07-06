
	var AllPlayer = localStorage.getItem("AllPlayers");
	var parsedPlayer = JSON.parse(AllPlayer);

	function compare(a, b)
	{
		return b.score - a.score;
	}
		parsedPlayer.players.sort(compare);

	getScoreboardData();
	function getScoreboardData()
	{
				for(var i = 0; i < parsedPlayer.players.length; i++)
				{
					var counterUsername = parsedPlayer.players[i].username.toString();
					var counterScore = parsedPlayer.players[i].score.toString();
					var counterDate = parsedPlayer.players[i].date.toString();

						var table = document.getElementById("table");
						var row = table.insertRow(-1);
						var rank = row.insertCell(0);
						var name = row.insertCell(1);
						var score = row.insertCell(2);
						var date = row.insertCell(3);

						rank.innerHTML = i + 1;
						name.innerHTML = counterUsername;
						score.innerHTML = counterScore;
						date.innerHTML = counterDate;
				}
	}
