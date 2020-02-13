var default_config = {
	duration        : 120,		// Duration of presentation in seconds
	slide_interval  : 10000,	// Length between transitions
	transition      : 1, 		// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
	transition_speed: 500,		// Speed of transition
};

config = $.extend(default_config, config);

var supersized_setup = {
	random    : 1,			// Start slide (0 is random)
	fit_always: 1,
	autoplay  : 0,

	// Functionality
	slide_interval  : config.slide_interval,	// Length between transitions
	transition      : config.transition, 		// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
	transition_speed: config.transition_speed,		// Speed of transition

	// Components
	slide_links: 'blank',	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
	slides     : slides,
    guaranteedSlides : guaranteedSlides
};

function shuffle_speakers() {
    var j, x, i;
    for (i = speakers.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = speakers[i];
        speakers[i] = speakers[j];
        speakers[j] = x;
    }
}

function load_speakers() {
	$('#speakers').html('<li>' + speakers.join('<li>'));
}

function load_topics() {
	$('#topics').html('<li>' + topics.join('<li>'));
}

function show_thank_you() {
    $('#first_win').val(speakers[0]);
	$('#second_win').val(speakers[1]);
    $('#thank_you').show();
}

function restart() {
    load_speakers();
	load_topics();
	$('.container').hide();
	$('#choose_group').show();
}

function define_vs_speakers() {
    $('.container').hide();
	$('#show_vs_speakers').show();

	$('#vs_speakers').text(speakers[0] + ' VS ' + speakers[1]);
	$('#vs_speakers').quickfit({max: 30});
}

function pick_topic() {
	$('.container').hide();
	$('#choose_topic').show();
	
	var topic_index = Math.floor(Math.random() * topics.length);
	var new_topic = topics[topic_index];
	topics.splice(topic_index, 1);

	$('#your_topic').text(new_topic);
	$('#your_topic').quickfit({max: 30});
}

function play_slides() {
	$('.container').hide();
	$('#count_down').text(3).show();
	setTimeout(function() {
		$('#count_down').text(2);
	}, 1000);
	setTimeout(function() {
		$('#count_down').text(1);
        // Do this here so the most recent value of current_slide is obtained.
        // Prevents slide repeats caused by restoring to a previously seen image.
        insert_random_guaranteed();
    }, 2000);
	setTimeout(function() {
		api.playToggle();
		$('#count_down').hide();
	}, 3000);
	setTimeout(function() {
        show_thank_you();
	}, (config.duration * 1000) + 3000);
}

function choose_winner(winner_number) {
        winner = speakers[winner_number];
        speakers.splice(0,2);
        speakers.push(winner);
        if (speakers.length == 1){
            $('.container').hide();
	        $('#winner').text("Winner is "+speakers[0]).show();
	        return;
        };
    	api.playToggle();
		restart();
}

$(document).ready(function() {
	$.supersized(supersized_setup);
    shuffle_speakers();
    restart();

	$('#go').click(function() {
        define_vs_speakers();
	});

	$('#next').click(function(){
	    pick_topic();
	});

	$('#again').click(function() {
		pick_topic();
	});

	$('#play').click(function() {
		play_slides();
	});

	$('#first_win').click(function(){
	    choose_winner(0);
	});

	$('#second_win').click(function(){
	    choose_winner(1);
	})
});

// Insert a jump to a random guaranteed image at a random point in the presentation.
function insert_random_guaranteed(){
  if (supersized_setup['guaranteedSlides'].length == 0) {
    return false;
  }
  activeIndex = vars.current_slide;
  if (isNaN(activeIndex)) {
    activeIndex = 0;
  }
  presentationLength = config.duration / (config.slide_interval / 1000);
  insertIndex = Math.floor((Math.random() * presentationLength));
  restoreIndex = activeIndex + insertIndex;
  insertTime = insertIndex * config.slide_interval;
  restoreTime = (insertIndex + 1) * config.slide_interval;

  if (insertIndex == 0) {
    // insert after the transition time so goTo won't abort.
    insertTime += config.transition_speed;
    // restore later so the picture stays the full amount of time.
    restoreTime += config.transition_speed;
  }

  console.log('activeIndex: ' + activeIndex);
  console.log('insertIndex: ' + insertIndex);
  console.log('restoreIndex: ' + restoreIndex);
  console.log('insertTime: ' + insertTime);
  console.log('restoreTime: ' +  restoreTime);

  /* jump to random guaranteed image */
  setTimeout(function(){
    api.goToRandomGuaranteed();
  }, insertTime);

  /* jump back */
  setTimeout(function() {
    api.goTo(restoreIndex);
  }, restoreTime);
}
