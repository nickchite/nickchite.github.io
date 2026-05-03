// Code for creating the chain of spaced circles and the sinusoidal wave credited to:
// https://bl.ocks.org/curran/e30339061fb0dac8dfcfbb57d06715b8

// Dimension recommendations (scale as you need but keep aspect ratio the same): 
// (800x600):      16 / 32
// (1280x720):     22 / 32
// (1366x768):     24 / 32
// (1600x900):     29 / 32
// (1920x1080):    32 / 32

var width = 1280 * 37 / 32 / 2,
    height = 720 * 37 / 32 / 2;

// number of horizontal frets and vertical strings
var n = 22;
var strings = 6;

// dimensions for circles/rects
var w = width;
var h = height / 6;
var center_line = h / 2;
var fret_radius = w / n / 2 - 1;
var amplitude = 3 * h / 20;
var mark_radius = center_line - (amplitude + fret_radius);

var text_height = h / 5; // text dimension

// useful lists for format
var colors = ["crimson", "orangered", "gold", "green", "blue", "purple"];
var default_notes = [64, 59, 55, 50, 45, 40]
var mark_positions = [3, 5, 7, 9, 15, 17, 19, 21];
var double_mark_positions = [12];

// Tone.js synthesizer per string
const synth = [new Tone.Synth().toDestination(), new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(), new Tone.Synth().toDestination(),
    new Tone.Synth().toDestination(), new Tone.Synth().toDestination()
];

// guitar modes
var mode = "fret"
var modes = ["fret", "strum", "chord"]

var time_step = "3n"; // Tone.js time per note

Tone.start(); // start Tone.js

// Centered Base SVG
var base = d3.select("#guitar")
    .append("center")
    .append("svg").attr("width", width).attr("height", height).attr("class", "base").style("background-color", "#d1a779");

// Mode Dropdown Selector
d3.select("#guitar").select("center").append("br");
d3.select("#guitar").select("center").append("select").attr("name", "mode").attr("id", "mode_sel")
    .selectAll("option").data(modes).enter().append("option")
    .attr("value", function(d) {
        return d
    })
    .text(function(d) {
        return d
    });

// Chord Button
d3.select("#guitar").select("center").append("button")
    .attr("type", "button")
    .text("CHORD!")
    .on("click", function() { // Button On Click Function for Playing Chord
        if (mode != "chord") return;
        for (i = 0; i < strings; ++i) {
            var svg = d3.select("svg.string-" + i);
            if (parseInt(svg.attr("current_note")) != 0) {
                svg.attr("playing", 1);
                synth[i].triggerAttackRelease(Tone.Frequency(parseInt(svg.attr("current_note")), "midi").toNote(), time_step);
            }
        }
    });

// Single Black Markings
d3.select("svg.base").selectAll("circle.single_mark").data(mark_positions).enter().append("circle")
    .attr("class", "single_mark")
    .attr("cy", height / 2)
    .attr("cx", function(d) {
        return (d + 0.5) * w / n;
    })
    .attr("r", mark_radius)
    .attr("fill", "black");

// Double Black Markings
for (i = 1; i <= 2; ++i) {
    d3.select("svg.base").selectAll("circle.double_mark-" + i).data(double_mark_positions).enter().append("circle")
        .attr("class", "double_mark-" + i)
        .attr("cy", i * height / 3)
        .attr("cx", function(d) {
            return (d + 0.5) * w / n;
        })
        .attr("r", mark_radius)
        .attr("fill", "black");
}

// Fret Lines
d3.select("svg.base").selectAll("rect.fret_line").data(d3.range(n).slice(1, n)).enter().append("rect")
    .attr("class", "fret_line")
    .attr("y", 0)
    .attr("x", function(d) {
        return d * w / n - 1;
    })
    .attr("width", 2)
    .attr("height", height)
    .attr("fill", "black");

// SVG per each string
base.selectAll("svg").data(d3.range(strings)).enter()
    .append("svg").attr("class", function(d) {
        return "string-" + d
    }).attr("y", function(d) {
        return h * d
    })
    .attr("width", width)
    .attr("height", h)

// Loop to setup frets and notes for all strings
for (i = 0; i < strings; ++i) {

    // Initialize string base note
    var svg = d3.select("svg.string-" + i);
    svg.attr("playing", 0).attr("base_note", default_notes[i]);

    // Circular Frets
    svg.selectAll("circle").data(d3.range(n).slice(1, n))
        .enter().append("circle")
        .attr("cx", function(d) {
            return (d + 0.5) * w / n; // Circular Spacing credit at top
        })
        .attr("cy", center_line)
        .attr("r", fret_radius)
        .attr("fill", colors[i])
        .attr("stroke", "cyan")
        .on("mouseover", function(d, i) { // Mouse Over function for strumming
            if (i == n - 1) return;
            mode = document.getElementById("mode_sel").value;
            if (mode != "strum") return;
            svg = d3.select(d["target"].parentNode);
            synth[svg.attr("class")[7]].triggerAttackRelease(Tone.Frequency(parseInt(svg.attr("base_note")) + i, "midi").toNote(), time_step);
            svg.attr("playing", 1);
            svg.attr("current_note", parseInt(svg.attr("base_note")) + i);
        }).on("click", function(d, i) { // Mouse Click function for fretting and chording
            if (i == n - 1) return;
            mode = document.getElementById("mode_sel").value;
            if (mode == "fret") {
                svg = d3.select(d["target"].parentNode);
                synth[svg.attr("class")[7]].triggerAttackRelease(Tone.Frequency(parseInt(svg.attr("base_note")) + i, "midi").toNote(), time_step);
                svg.attr("playing", 1);
                svg.attr("current_note", parseInt(svg.attr("base_note")) + i);
            } else if (mode == "chord") {
                svg = d3.select(d["target"].parentNode);
                if (svg.attr("current_note") == parseInt(svg.attr("base_note")) + i)
                    svg.attr("current_note", 0);
                else
                    svg.attr("current_note", parseInt(svg.attr("base_note")) + i);
            }
        });

    // Labels for Circular Frets
    svg.selectAll("text").data(d3.range(n).slice(1, n))
        .enter().append("text").attr("x", function(d) {
            return fret_radius / 3 + d * w / n;
        })
        .attr("y", h / 2).attr("dy", ".35em")
        .attr("fill", "white")
        .attr("class", "fret")
        .style("font-size", text_height + "px")
        .style("pointer-events", "none")
        .text(function(d) {
            if (d == n - 1) return "";
            return Tone.Frequency(parseInt(svg.attr("base_note")) + d, "midi").toNote();
        });

    // Rectangular Base Note Fret
    svg.append("rect")
        .attr("x", (0) * w / n)
        .attr("y", center_line / 2)
        .attr("width", 2 * fret_radius)
        .attr("height", 2 * fret_radius)
        .attr("fill", colors[i])
        .attr("stroke", "cyan")
        .on("mouseover", function(d, i) { // Mouse Over function for strumming
            mode = document.getElementById("mode_sel").value;
            if (mode != "strum") return;
            svg = d3.select(d["target"].parentNode);
            synth[svg.attr("class")[7]].triggerAttackRelease(Tone.Frequency(svg.attr("base_note"), "midi").toNote(), time_step);
            svg.attr("playing", 1);
            svg.attr("current_note", parseInt(svg.attr("base_note")));
        }).on("click", function(d, i) {
            mode = document.getElementById("mode_sel").value;
            if (mode == "fret") { // Mouse Click function for fretting and chording
                svg = d3.select(d["target"].parentNode);
                synth[svg.attr("class")[7]].triggerAttackRelease(Tone.Frequency(svg.attr("base_note"), "midi").toNote(), time_step);
                svg.attr("playing", 1);
                svg.attr("current_note", parseInt(svg.attr("base_note")));
            } else if (mode == "chord") {
                svg = d3.select(d["target"].parentNode);
                if (svg.attr("current_note") == parseInt(svg.attr("base_note")))
                    svg.attr("current_note", 0);
                else svg.attr("current_note", parseInt(svg.attr("base_note")));
            }
        });

    // Label for Rectangular Fret
    svg.append("text").attr("x", fret_radius / 3).attr("y", h / 2).attr("dy", ".35em").attr("class", "base")
        .attr("fill", "white")
        .style("font-size", text_height + "px")
        .style("pointer-events", "none")
        .text(Tone.Frequency(svg.attr("base_note"), "midi").toNote());

    // Setup the synthesizer for the string
    synth[i].name = "svg.string-" + i;
    synth[i].onsilence = (function(s) { // handler for when the note finishes playing
        var svg = d3.select(s.name);
        svg.attr("playing", 0);
    });

}

// The timer function updates the positions and highlighting of the frets
var prevMode = "";
d3.timer(function(time) {
    for (i = 0; i < strings; ++i) {
        var svg = d3.select("svg.string-" + i);

        // Update Rectangular Fret Highlight
        svg.select("rect").attr("stroke-width", function() {
            if (mode != "chord") return 0;
            if (parseInt(svg.attr("base_note")) != parseInt(svg.attr("current_note"))) return 0;
            return 3;
        });

        // Update Circular Fret Movement and Highlight
        svg.selectAll("circle").attr("cy", function(d) { // tune "wiggle" here
            return (playing(d, svg) * amplitude * Math.sin(d / 2 + time / 125)) + center_line; // Sinusoid credit at top
        }).attr("stroke-width", function(d) {
            if (mode != "chord") return 0;
            if (parseInt(svg.attr("base_note")) + d != parseInt(svg.attr("current_note"))) return 0;
            return 3;
        });

        // Update Circular Fret Label Movement
        svg.selectAll("text.fret").attr("y", function(d) { // tune "wiggle" here too
            return (playing(d, svg) * amplitude * Math.sin(d / 2 + time / 125)) + center_line; // Sinusoid credit at top
        });

        // Resets notes when the mode changes to chord mode
        if (prevMode != mode && mode == "chord") {
            svg.attr("current_note", 0);
        }

    }
    prevMode = mode;
});

// Checks if a fret is playing on the string: used for visual fx
function playing(d, svg) {
    if (svg.attr("playing") == 0) return 0;
    if (parseInt(svg.attr("base_note")) + d <= parseInt(svg.attr("current_note"))) return 0;
    return 1;
}