const getTagEPUB3Test = require('./getTagEPUB3Test')

test('test the function to see if it grabs the epub3 tag name correctly', () => {
  expect(getTagEPUB3Test('<metadata>\n<link rel="dcterms:conformsTo"\nhref="http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa"/>\n<meta property="a11y:certifiedBy">Dewey, Checkett and Howe</meta>\n<meta property="a11y:certifierCredential">Certifiably Accessible</meta>\n<link rel="a11y:certifierReport"\nhref="https://example.com/reports/a11y/pub.html"/>\n…\n</metadata>')).toEqual(["dcterms:conformsTo", "a11y:certifiedBy"])


})