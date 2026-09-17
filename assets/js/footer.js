// ZSkillup — shared footer, injected so all pages stay in sync.
// The <script> tag including this file must carry data-depth="0|1|2"
// (0 = site root, 1 = /career/, 2 = /curriculum/<program>/)
(function () {
  var scriptEl = document.currentScript;
  var depth = parseInt(scriptEl.getAttribute('data-depth') || '0', 10);
  var root = depth === 0 ? './' : depth === 1 ? '../' : '../../';

  var html = ''
    + '<div class="container">'
    + '  <div class="footer-grid">'
    + '    <div class="footer-brand">'
    + '      <a href="' + root + '" class="brand" aria-label="ZSkillup home">'
    + '        <span class="brand-mark">Z</span>'
    + '        <span class="stack"><span class="brand-word">ZSKILLUP</span></span>'
    + '      </a>'
    + '      <p>Helping students build globally recognised finance careers through the B.Com + ACCA, ACCA Only and ACCA Fast Track programs.</p>'
    + '    </div>'
    + '    <div class="footer-col">'
    + '      <h4>Programs</h4>'
    + '      <ul>'
    + '        <li><a href="' + root + 'curriculum/bcom-acca/">B.Com + ACCA</a></li>'
    + '        <li><a href="' + root + 'curriculum/acca-only/">ACCA Only Program</a></li>'
    + '        <li><a href="' + root + 'curriculum/acca-fast-track/">ACCA Fast Track</a></li>'
    + '      </ul>'
    + '    </div>'
    + '    <div class="footer-col">'
    + '      <h4>Company</h4>'
    + '      <ul>'
    + '        <li><a href="' + root + '#program">About the Program</a></li>'
    + '        <li><a href="' + root + '#fees">Fees</a></li>'
    + '        <li><a href="' + root + 'career/">Career</a></li>'
    + '        <li><a href="' + root + '#faqs">FAQs</a></li>'
    + '      </ul>'
    + '    </div>'
    + '    <div class="footer-col">'
    + '      <h4>Contact</h4>'
    + '      <ul>'
    + '        <li><span>hello@zskillup.com</span></li>'
    + '        <li><span>+91 90000 00000</span></li>'
    + '        <li><span>Bengaluru, India</span></li>'
    + '      </ul>'
    + '    </div>'
    + '  </div>'
    + '  <div class="footer-bottom">'
    + '    <span>&copy; ' + new Date().getFullYear() + ' ZSkillup. All rights reserved.</span>'
    + '    <span>Privacy Policy &middot; Terms of Service</span>'
    + '  </div>'
    + '</div>';

  var mount = document.getElementById('footer-root');
  if (mount) mount.innerHTML = html;
})();
