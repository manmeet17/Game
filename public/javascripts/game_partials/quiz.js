var quiz = {
    loadQuestions: function (data, score) {
        questions = data;
        playerScore = score;
        playerId = $("#game-holder").data('id');
        checkingAnswer=false;
    },

    showNextQuestion: function () {
        if (questions.length > i) {
            $('#a').css('display','none');
            $('#b').css('display','none');
            $('#c').css('display','none');
            $('#d').css('display','none');

            $('.qBody').text(questions[i].questionBody);
            if(questions[i].option_a.length!=0){
                $('#a').css('display','inline-block');
                $('label#fora').find('strong').text(questions[i].option_a);
            }
            if(questions[i].option_b.length!=0){
                $('#b').css('display','inline-block');
                $('label#forb').find('strong').text(questions[i].option_b);
            }
            if(questions[i].option_c.length!=0){
                $('#c').css('display','inline-block');
                $('label#forc').find('strong').text(questions[i].option_c);
            }
            if(questions[i].option_d.length!=0){
                $('#d').css('display','inline-block');
                $('label#ford').find('strong').text(questions[i].option_d);
            }
            checkingAnswer=false;
            $('label').click(function(e){
                e.preventDefault()
                var it=$(this).attr("id");
                $('input:radio[id='+it[it.length-1]+']').prop('checked',true);
            });
        } else {
            socket.emit("quiz-done", correct, playerScore, playerId);
            i = 0;
            correct = 0;
            $('.questionCounter').attr("src", "../images/assets/" + i + ".png");
        }
    },

    checkAnswer: function () {
        var $selectedOption = $("input[type='radio']:checked").val();
        if(!checkingAnswer && $selectedOption!== undefined){
        var $selectedOption = $("input[type='radio']:checked");
        checkingAnswer=true;
            if ($selectedOption.length) {
                socket.emit('checkAnswer', {
                    id: questions[i]._id,
                    answer: $selectedOption.val()
                });
            }
        }
    },

    checkedAnswer: function (data) {
        i++;
        var cOpt = data.correctOption;
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
        },500);
    },

    clearOption: function () {
        if(i==10){
            $(".questions").css('display', 'none');
        }
        $('.questionCounter').attr("src", "../images/assets/" + i + ".png");
        $('input[type="radio"]:checked').prop('checked', false);
        $('.qBody').text('');
        $('label#fora').find('strong').text('');
        $('label#forb').find('strong').text('');
        $('label#forc').find('strong').text('');
        $('label#ford').find('strong').text('');
        this.showNextQuestion();
    }
}