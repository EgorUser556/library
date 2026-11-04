import './styles/main.css';

const root = document.querySelector('#app');

const title = document.createElement('h1');
title.textContent = 'The Library';

const description = document.createElement('p');
description.textContent = 'Project setup is complete.';

root.append(title, description);
