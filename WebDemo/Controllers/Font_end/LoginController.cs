using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Text;
using WebDemo.Models;
using System;

namespace WebDemo.Controllers.Font_end
{
    public class LoginController : Controller
    {
        private string _key;
        WebDemoContext context;
        public LoginController()
        {
            _key = "E546C8DF278CD5931069B522E695D4F2";
            context = new WebDemoContext();
        }
        public IActionResult Index()
        {
            return View("Views/Font-end/Login/Login.cshtml");
        }

        #region login
        [HttpPost]
        public IActionResult doLogin(string userName, string password)
        {
            try
            {
                User user = context.Users.Where(c => c.UserName.Equals(userName)).FirstOrDefault();
                if (user == null)
                {
                    var res = new
                    {
                        Success = false,
                        Message = "Wrong account or password"
                    };
                    return Json(res);
                }
                else
                {
                    var pass = DecryptString(user.UserPassword, _key);
                    if (pass == password)
                    {
                        HttpContext.Session.SetString("Username", user.UserName);
                        HttpContext.Session.SetInt32("UserId", user.UserId);
                        HttpContext.Session.SetString("IsAdmin", user.IsAdmin.ToString());
                        var res = new
                        {
                            Success = true,
                        };
                        return Json(res);
                    }
                    else
                    {
                        var res = new
                        {
                            Success = false,
                            Message = "Wrong account or password"
                        };
                        return Json(res);
                    }
                }
            }
            catch (Exception)
            {
                throw;
            }

        }
        #endregion

        #region Logout
        [HttpPost]
        public IActionResult signOut()
        {
            HttpContext.Session.Remove("Username");
            HttpContext.Session.Remove("UserId");
            HttpContext.Session.Remove("IsAdmin");
            var res = new { Success = true, Massage = "" };
            return Json(res);

        }
        #endregion

        #region register
        [HttpPost]
        public IActionResult create_user(string userName, string password, string email)
        {
            var urs = context.Users.Where(c => c.UserName.Equals(userName));
            if (urs != null)
            {
                var message = createUser(userName, password, email);
                if (message != null)
                {
                    var res = new
                    {
                        Success = true,
                        Message = "Register Success",
                        Data = urs,
                    };
                    return Json(res);
                }
                else
                {
                    var res = new
                    {
                        Success = false,
                        Message = "Register Error",
                    };
                    return Json(res);
                }
            }
            else
            {
                var res = new
                {
                    Success = false,
                    Message = "Account already exists"
                };
                return Json(res);
            }
        }

        private object createUser(string userName, string password, string email)
        {
            try
            {
                DateTime date = DateTime.Now;
                User user = new User();
                user.UserName = userName;
                user.UserEmail = email;
                user.UserPassword = EncryptString(password, _key);
                user.IsAdmin = false;
                user.CreateAt = date;
                context.Users.Add(user);
                context.SaveChanges();
                return new
                {
                    Message = "Success"
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        #endregion

        #region Bycrypt
        private string EncryptString(string text, string keyString)
        {
            var key = Encoding.UTF8.GetBytes(keyString);

            using (var aesAlg = Aes.Create())
            {
                using (var encryptor = aesAlg.CreateEncryptor(key, aesAlg.IV))
                {
                    using (var msEncrypt = new MemoryStream())
                    {
                        using (var csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                        using (var swEncrypt = new StreamWriter(csEncrypt))
                        {
                            swEncrypt.Write(text);
                        }
                        var iv = aesAlg.IV;
                        var decryptedContent = msEncrypt.ToArray();
                        var result = new byte[iv.Length + decryptedContent.Length];
                        Buffer.BlockCopy(iv, 0, result, 0, iv.Length);
                        Buffer.BlockCopy(decryptedContent, 0, result, iv.Length, decryptedContent.Length);
                        return Convert.ToBase64String(result);
                    }
                }
            }
        }

        private string DecryptString(string cipherText, string keyString)
        {
            var fullCipher = Convert.FromBase64String(cipherText);
            var iv = new byte[16];
            var cipher = new byte[16];

            Buffer.BlockCopy(fullCipher, 0, iv, 0, iv.Length);
            Buffer.BlockCopy(fullCipher, iv.Length, cipher, 0, iv.Length);
            var key = Encoding.UTF8.GetBytes(keyString);

            using (Aes aesAlg = Aes.Create())
            {
                using (ICryptoTransform decryptor = aesAlg.CreateDecryptor(key, iv))
                {
                    dynamic result;
                    using (MemoryStream msDecrypt = new MemoryStream(cipher))
                    {
                        using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                        {
                            using (StreamReader srDecrypt = new StreamReader(csDecrypt))
                            {
                                result = srDecrypt.ReadToEnd();
                            }
                        }
                    }

                    return result;
                }
            }
        }
        #endregion
    }
}
