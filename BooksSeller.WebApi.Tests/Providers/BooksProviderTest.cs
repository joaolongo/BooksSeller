using BooksSeller.WebApi.Providers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BooksSeller.WebApi.Models;
using LiteDB;

namespace BooksSeller.WebApi.Tests.Providers
{
    [TestClass]
    public class BooksProviderTest
    {
        private BooksProvider _booksProvider;
        private int _bookId;

        public BooksProviderTest()
        {
            if (!Directory.Exists("C:/UnitTests/BooksSeller/"))
                Directory.CreateDirectory("C:/UnitTests/BooksSeller/");

            _booksProvider = new BooksProvider("C:/UnitTests/BooksSeller/Bookshelf.db");

            InitializeDatabase();
        }
        
        private void InitializeDatabase()
        {
            _bookId = _booksProvider.items.Insert(new Book
            {
                Code = "ABC-1234",
                Price = 4.1,
                Title = "C# For Dummies",
                ReleaseDate = DateTime.Now.AddYears(-2)
            });
        }

        [TestMethod]
        public void Create()
        {
            try
            {
                _booksProvider.Create(new Book
                {
                    Code = "DEF-5678",
                    Price = 8.2,
                    Title = "Javascipt For Dummies",
                    ReleaseDate = DateTime.Now.AddYears(-1)
                });
            }
            catch (Exception)
            {
                Assert.Fail();
            }
        }

        [TestMethod]
        public void GetBook()
        {
            var result = _booksProvider.GetBook(_bookId);

            Assert.IsNotNull(result.Id);
        }

        [TestMethod]
        public void GetBooks()
        {
            var result = _booksProvider.GetBooks();

            Assert.IsNotNull(result.FirstOrDefault(x => x.Id == _bookId));
        }

        [TestMethod]
        public void Update()
        {
            try
            {
                _booksProvider.Update(_bookId, new Book
                {
                    Code = "AAB-0123",
                    Price = 6.1,
                    Title = "C# For Dummies",
                    ReleaseDate = DateTime.Now
                });
            }
            catch (Exception)
            {
                Assert.Fail();
            }
        }
    }
}
