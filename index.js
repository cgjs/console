/*
  ┌─────────────┐
  │ Differences │
  └─────────────┘
  no util.format and
  no util.inspect

  ┌─────────────┐
  │   Missing   │
  └─────────────┘
  console.group
  console.groupCollapsed
  console.groupEnd()
  no Console constructor

 */

const GLib = imports.gi.GLib;

this.assert = (value, message) => {
  if (!value) printerr(`\u26D4\uFE0F \x1b[91mAssertion failed:\x1b[0m ${message}`);
};

this.clear = () => print('\x1bc');

const counter = Object.create(null);
this.count = (label = 'default') => {
  if (!(label in counter)) counter[label] = 0;
  print(`${label}: ${++counter[label]}`);
};
this.countReset = (label = 'default') => {
  delete counter[label];
};

this.info = (...args) => {
  print(`\u2139\uFE0F  \x1b[92mInfo:\x1b[0m ${args.join(' ')}`);
};

this.log = (...args) => print(args.join(' '));

const timers = Object.create(null);
this.time = (label = 'default') => {
  timers[label] = GLib.get_real_time();
};
this.timeEnd = (label = 'default') => {
  let result = (GLib.get_real_time() - timers[label]) / 1000;
  delete timers[label];
  print(label + ': ' + result + 'ms');
};

this.trace = (...args) => {
  this.info(`Trace: ${args.join(' ')}`);
  print(new Error('').stack);
};

this.warn = (...args) => {
  print(`\u26A0\uFE0F  \x1b[93mWarning:\x1b[0m ${args.join(' ')}`);
};
