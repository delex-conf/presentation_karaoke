# Presentation Karaoke battle
1.5 minutes, 2 speakers, random topic, random slides --- GO!

*This is a fork and adaptation of:*
https://github.com/eleybourn/presentation_karaoke

## How to run
It is designed to be downloaded and run directly on your local computer.
It's pure HTML and Javascript, so nothing to install.

1. **Download the application** 
2. **Run `index.html`**
3. **Configure list of speakers in `config/config.js`**
4. **Press "Go"**

## How to play
1. **Press "Play"**
2. **First speaker should start talking.**<br>The slides will auto-advance after 10 seconds
3. **Be funny**
4. **Don't read the slides.**<br>Use them as a prompt only
5. **Tell a story**
6. **After slide will be changed - second speaker should start talking**
7. **Be funny**
8. **Don't read the slides**<br>Use them as a prompt only
9. **Tell a story**
10. **If time is not up and slide is changed then goto 2**
10. **Viewers should choose a winner**
11. **Next battle**

## Topics
You can add/change topics in the `/config/topics.js` file.

## Slides
You can add/change slides in the `/config/slides.js` file.

## Configuration
You can configure a number of properties in the `/config/config.js` file:
- **duration**<br>
	Duration of presentation in seconds<br>
	*Default: 120*
- **slide_interval**<br>
	Length between transitions in milliseconds<br>
    *Default: 1000*
- **transition**<br>
	0 (None), 1 (Fade), 2 (Slide Top), 3 (Slide Right), 4 (Slide Bottom), 5 (Slide Left), 6 (Carousel Right), 7 (Carousel Left)<br>
	*Default: 1*
- **transition_speed**<br>
	Speed of transition in milliseconds<br>
	*Default: 500*
