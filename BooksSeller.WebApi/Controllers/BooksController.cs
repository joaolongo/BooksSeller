using BooksSeller.WebApi.Models;
using BooksSeller.WebApi.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace BooksSeller.WebApi.Controllers
{
    [EnableCors(origins: "http://localhost:46766", headers: "*", methods: "*")]
    public class BooksController : ApiController
    {
        IBooksProvider _booksProvider;

        public BooksController(IBooksProvider booksProvider)
        {
            _booksProvider = booksProvider;
        }

        // GET: api/Books
        public IEnumerable<Book> Get()
        {
            return _booksProvider.GetBooks();
        }

        // GET: api/Books/5
        public Book Get(int id)
        {
            return _booksProvider.GetBook(id);
        }

        // POST: api/Books
        public void Post([FromBody]Book value)
        {
            _booksProvider.Create(value);
        }

        // PUT: api/Books/5
        public void Put(int id, [FromBody]Book value)
        {
            _booksProvider.Update(id, value);
        }
    }
}
