
module.exports = {
    'Homepage is accessible': function (test) {
        test
        .open('http://')
        .assert.url().is('http://', 'Homepage exist')
        .screenshot('homepage_:viewport_:date.png')
        .done();
    }, // Default test
};
