<a name="1.0.0"></a>
# [1.0.0](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.2.0...1.0.0) (2018-09-15)


### Bug Fixes

* **demo:** fixes home height on small devices ([88bdccf](https://gitlab.com/w11k-es/angular-sticky-things/commit/88bdccf))
* **sticky:** fixes minor position issue for boundary elements ([2c79fc0](https://gitlab.com/w11k-es/angular-sticky-things/commit/2c79fc0))


### Features

* **demo:** adds breakpoint to dev demo ([0479a52](https://gitlab.com/w11k-es/angular-sticky-things/commit/0479a52))
* **sticky:** rewrites scroll logic in rxjs in order to fix a bug, adds e2e tests and fixes a bug when boundary class was not removed ([1860784](https://gitlab.com/w11k-es/angular-sticky-things/commit/1860784))


### BREAKING CHANGES

* **sticky:** This package has now a dependency on rxjs and @w11k/ngx-componentdestroyed



<a name="0.2.0"></a>
# [0.2.0](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.3...0.2.0) (2018-09-04)


### Bug Fixes

* **stick:** calculates now left properly, works now in nested elements and correctly calculates offsetTop. ([34eae37](https://gitlab.com/w11k-es/angular-sticky-things/commit/34eae37))
* **sticky:** fixes bug on window:resize ([8170a67](https://gitlab.com/w11k-es/angular-sticky-things/commit/8170a67))
* **sticky:** fixes wrong directive name in developer warning ([f592eb1](https://gitlab.com/w11k-es/angular-sticky-things/commit/f592eb1))


### Features

* **npm:** adds readme and license to npm package ([af28e20](https://gitlab.com/w11k-es/angular-sticky-things/commit/af28e20))
* **sticky:** implements boundary elements ([4538b5a](https://gitlab.com/w11k-es/angular-sticky-things/commit/4538b5a))
* **sticky:** removes deprecated methods 'getHeight' and 'getWidth' ([0875601](https://gitlab.com/w11k-es/angular-sticky-things/commit/0875601))



<a name="0.1.4"></a>
## [0.1.4](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.3...0.1.4) (2018-09-04)


### Bug Fixes

* **stick:** calculates now left properly, works now in nested elements and correctly calculates offsetTop. ([34eae37](https://gitlab.com/w11k-es/angular-sticky-things/commit/34eae37))


### Features

* **npm:** adds readme and license to npm package ([af28e20](https://gitlab.com/w11k-es/angular-sticky-things/commit/af28e20))



<a name="0.1.3"></a>
## [0.1.3](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.2...0.1.3) (2018-08-15)



<a name="0.1.2"></a>
## [0.1.2](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.1...0.1.2) (2018-08-15)


### Bug Fixes

* **demo:** typo ([898619d](https://gitlab.com/w11k-es/angular-sticky-things/commit/898619d))
* **stick:** defaults now to false in order to have proper detection on page that are already scrolled down at load ([07a4b51](https://gitlab.com/w11k-es/angular-sticky-things/commit/07a4b51))
* **width:** restore elements width on resize ([45db16e](https://gitlab.com/w11k-es/angular-sticky-things/commit/45db16e))


### Features

* **host-listener:** limit makeSticky & removeSticky calls ([1ff348f](https://gitlab.com/w11k-es/angular-sticky-things/commit/1ff348f))
* **position:** respects elements position (width) ([08e0f61](https://gitlab.com/w11k-es/angular-sticky-things/commit/08e0f61))



<a name="0.1.1"></a>
## [0.1.1](https://gitlab.com/w11k-es/angular-sticky-things/compare/0.1.0...0.1.1) (2018-07-30)



<a name="0.1.0"></a>
# 0.1.0 (2018-07-30)


### Bug Fixes

* **lib:** improves prefixes (sticky for lib, demo for demo) ([721138d](https://gitlab.com/w11k-es/angular-sticky-things/commit/721138d))


### Features

* **ci:** first draft for gitlab-ci ([336a020](https://gitlab.com/w11k-es/angular-sticky-things/commit/336a020))
* **demo:** adds demo page ([57fe12a](https://gitlab.com/w11k-es/angular-sticky-things/commit/57fe12a))
* **lib:** adds sticky thing directive ([2e8fe33](https://gitlab.com/w11k-es/angular-sticky-things/commit/2e8fe33))



