"use strict";

const btn = document.querySelector(".btn--start");
const section1 = document.querySelector(".section--1");

const showInfo = () => {
    section1.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
};

btn.addEventListener("click", showInfo);
