const getTagNameTest = require('./getTagNameTest')

test('test the function to see if it grabs the tag name correctly', () => {
  expect(getTagNameTest('<metadata>\n<meta name="dcterms:conformsTo"\ncontent="http://www.idpf.org/epub/a11y/accessibility-20170105.html#wcag-aa"/>\n<meta name="a11y:certifiedBy" content="Dewey, Checkett and Howe"/>\n<meta name="a11y:certifierCredential" content="Certifiably Accessible"/>\n<meta name="a11y:certifierReport"\ncontent="https://example.com/reports/a11y/pub.html"/>\n…\n</metadata>')).toBe("dcterms:conformsTo")


})