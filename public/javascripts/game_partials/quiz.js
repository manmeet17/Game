let quiz = {
    loadQuestions: function (data, score) {
        questions = data;
        playerScore = score;
        playerId = $("#game-holder").data('id');
    },

    showNextQuestion: function () {
        console.log(playerId);
        if (questions.length > i) {
            $('.qBody').text(questions[i].questionBody);
            $('label#fora').html('- <strong>' + questions[i].option_a + '</strong>');
            $('label#forb').html('- <strong>' + questions[i].option_b + '</strong>');
            $('label#forc').html('- <strong>' + questions[i].option_c + '</strong>');
            $('label#ford').html('- <strong>' + questions[i].option_d + '</strong>');

            $('label').click(function(e){
                e.preventDefault()
                let it=$(this).attr("id");
                console.log(it[it.length-1]);
                $('input:radio[id='+it[it.length-1]+']').prop('checked',true);
            });

            $('.hintBtn').click(function (e) {
                e.preventDefault();
                $('.hint').text(questions[i].hint);
            });
        } else {
            socket.emit("quiz-done", correct, playerScore, playerId);
            i = 0;
            correct = 0;
            $('.questionCounter').attr("src", "../images/assets/" + i + ".png");
        }
    },

    checkAnswer: function () {
        var $selectedOption = $("input[type='radio']:checked");
        console.log("Q val: " + i);
        if ($selectedOption.length) {
            socket.emit('checkAnswer', {
                id: questions[i]._id,
                answer: $selectedOption.val()
            });
        }
    },

    checkedAnswer: function (data) {
        i++;
        let cOpt = data.correctOption;
        var $selectedOption = $("input[type='radio']:checked").val();
        if (data.answeredCorrect) {
            correct++;
            $("#for" + cOpt).find("strong").addClass('correctAns');
        } else {
            $("#for" + $selectedOption).find("strong").addClass('wrongAns');
            $("#for" + cOpt).find("strong").addClass('correctAns');
        }

        setTimeout(function(){
            $("#for" + $selectedOption).find("strong").removeClass('wrongAns');
            $("#for" + cOpt).find("strong").removeClass('correctAns');
            quiz.clearOption();
        },1000);
    },

    clearOption: function () {
        $('.questionCounter').attr("src", "../images/assets/" + i + ".png");
        $('input[type="radio"]:checked').prop('checked', false);
        $('.qBody').text('');
        $('label#fora').html('');
        $('label#forb').html('');
        $('label#forc').html('');
        $('label#ford').html('');
        $('.hint').text('');
        this.showNextQuestion();
    }
}