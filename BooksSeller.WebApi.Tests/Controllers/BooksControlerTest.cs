using BooksSeller.WebApi.Controllers;
using BooksSeller.WebApi.Providers;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using LiteDB;
using BooksSeller.WebApi.Models;
using System.IO;

namespace BooksSeller.WebApi.Tests.Controllers
{
    [TestClass]
    public class BooksControlerTest
    {
        private readonly BooksProvider _booksProvider;
        private readonly BooksController _booksController;
        private int _bookId;

        public BooksControlerTest()
        {
            if (!Directory.Exists("C:/UnitTests/BooksSeller/"))
                Directory.CreateDirectory("C:/UnitTests/BooksSeller/");

            _booksProvider = new BooksProvider("C:/UnitTests/BooksSeller/Bookshelf.db");

            _booksController = new BooksController(_booksProvider);

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
        public void GetAll()
        {
            var result = _booksController.Get();

            Assert.IsNotNull(result.FirstOrDefault(x => x.Id == _bookId));
        }

        [TestMethod]
        public void Get()
        {
            var result = _booksController.Get(_bookId);

            Assert.IsNotNull(result.Id);
        }

        [TestMethod]
        public void Post()
        {
            try
            {
                _booksController.Post(new Book
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
        public void Put()
        {
            try
            {
                _booksController.Put(_bookId, new Book
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
