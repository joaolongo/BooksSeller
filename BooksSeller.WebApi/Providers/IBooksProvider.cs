using BooksSeller.WebApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BooksSeller.WebApi.Providers
{
    public interface IBooksProvider
    {
        Book Create(Book book);
        
        Book Update(int id, Book book);

        Book GetBook(int id);

        List<Book> GetBooks();
    }
}