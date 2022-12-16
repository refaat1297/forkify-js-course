import icons from "../../img/icons.svg";
import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination')

  addHandlerClick (handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline')
      if (!btn) return
      const goToPage = +btn.dataset.goto
      handler(goToPage)
    })
  }

  _generateMarkup () {
    const {results, resultsPerPage, page} = this._data
    const numPages = Math.ceil(results.length / resultsPerPage)

    // Page 1, there are other pages
    if (page === 1 && numPages > 1) {
      return `
        <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `
    }

    // Last page
    if (page === numPages && numPages > 1) {
      return `
        <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
      `
    }

    // Other page
    if (page < numPages) {
      return `
        <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${page - 1}</span>
        </button>
        <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
          <span>Page ${page + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `
    }

    // Page 1, there are NO other pages
    return ''

  }
}


export default new PaginationView()
