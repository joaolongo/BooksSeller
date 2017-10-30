using System.Collections.Generic;
using BooksSeller.WebApi.Models;
using LiteDB;
using System.Linq;
using System.Web;
using Microsoft.Practices.Unity;

namespace BooksSeller.WebApi.Providers
{
    public class BooksProvider : IBooksProvider
    {
        private readonly LiteDatabase db;
        public readonly LiteCollection<Book> items;

        [InjectionConstructor]
        public BooksProvider() : this("")
        {
            
        }

        public BooksProvider(string dbPath = null)
        {
            if (string.IsNullOrEmpty(dbPath))
                dbPath = HttpContext.Current.Server.MapPath("~/BookShelf.db");
            db = new LiteDatabase(dbPath);
            items = db.GetCollection<Book>(nameof(Book));
        }

        ~BooksProvider()
        {
            db.Dispose();
        }

        public Book Create(Book book)
        {
            var result = items.Insert(book);

            return GetBook(result);
        }

        public Book CreateOrUpdate(Book book)
        {
            if (book.Id > 0)
                items.Update(book);
            else
                return Create(book);
            return book;
        }

        public Book Update(int id, Book book)
        {
            var dbItem = items.FindById(id);

            dbItem.Code = book.Code;
            dbItem.Price = book.Price;
            dbItem.ReleaseDate = book.ReleaseDate;
            dbItem.Title = book.Title;

            items.Update(dbItem);

            return dbItem;
        }

        public void DeleteBook(int id) => items.Delete(id);

        public void DeleteBook(Book book) => DeleteBook(book.Id);

        public Book GetBook(int id)
        {
            var result = items.FindById(id);

            if (result == null)
                return new Book();
            return result;
        }

        public List<Book> GetBooks()
        {
            var result = items.FindAll();

            if (result == null)
                return new List<Book>();
            return result.ToList();
        }
    }
}