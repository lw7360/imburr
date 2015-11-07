'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const ipc = require('ipc');

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;

function onClosed () {
  // dereference the window
  // for multiple windows store them in an array
  mainWindow = null;
}

var frame = process.platform === 'win32';

function createMainWindow () {
  const win = new BrowserWindow({
    width: 300,
    height: 300,
    frame: frame,
    show: false,
    icone: 'icon.png',
    resizable: false
  });

  win.loadUrl('file://' + __dirname + '/index.html');
  win.on('closed', onClosed);

  ipc.on('ready', function () {
    win.show()
  });

  ipc.on('close', function () {
    app.quit();
  });

  ipc.on('minimize', function () {
    win.minimize();
  });

  return win;
}

app.on('activate-with-no-open-windows', function () {
  if (!mainWindow) {
    mainWindow = createMainWindow();
  }
});

app.on('ready', function () {
  mainWindow = createMainWindow();
});
