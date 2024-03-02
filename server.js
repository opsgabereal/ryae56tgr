<script src="/socket.io/socket.io.js"></script>
<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
<script>
    $(function () {
        const socket = io();
        const gameContainer = $('#game-container');

        // Function to join the game with a custom username
        function joinGame() {
            const username = $('#username').val().trim();
            if (username !== '') {
                socket.emit('new user', username);
            }
        }

        // Listen for updated player positions and names
        socket.on('update players', function(players){
            gameContainer.empty();
            for (const [id, player] of Object.entries(players)) {
                // Display the player block with custom name
                gameContainer.append(`
                    <div class="player" id="${id}" style="left:${player.x}px; top:${player.y}px;">
                        ${player.username}
                    </div>
                `);
            }
        });

        // Listen for player movement
        gameContainer.on('mousemove', function(e){
            const position = {
                x: e.pageX - gameContainer.offset().left,
                y: e.pageY - gameContainer.offset().top,
            };
            socket.emit('player move', position);
        });

        // Bind the joinGame function to the button click event
        $('#join-button').on('click', joinGame);
    });
</script>
