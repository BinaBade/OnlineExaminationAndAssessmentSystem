using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogicLayer.ModelEntities;
using LogicLayer.DataProvider;
using System.Security.Claims;
using Microsoft.AspNetCore.Http.Authentication;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineExamination.Controllersa
{
    public class UserController : Controller
    {
        // GET: /<controller>/
        [AllowAnonymous]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult UserRegistration()
        {
            return View();
        }
        [Authorize(Policy = "UserOnly")]
        public IActionResult UserHome()
        {
            return View();
        }

      
        public IActionResult UserProfile()
        {
            return View();
        }


        [Authorize(Policy = "UserOnly")]
        public IActionResult NotActivePage()
        {
            return View();
        }

        [Authorize(Policy = "UserOnly")]
        public IActionResult Notice()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult UserList()
        {
            return View();
        }

        //approve User
        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult ApproveUser()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult RoleListAndRoleAdd()
        {
            return View();
        }


        //list user fron database
        [Authorize(Policy = "AdministratorOnly")]
        public List<UserModel> GetAllUsers()
        {
            UserDataProvider objep = new UserDataProvider();
            List<UserModel> listdata = objep.GetAllUsers();
            return listdata;
        }

        //list user fron database which is not approved
        [Authorize(Policy = "AdministratorOnly")]
        public List<UserModel> GetUnaprrovedUsers()
        {
            UserDataProvider objep = new UserDataProvider();
            List<UserModel> listdata = objep.GetUnaprrovedUsers();
            return listdata;
        }


        //Add user from admin dashboard
        [Authorize(Policy = "AdministratorOnly")]

        [HttpPost]
        public void ApproveUserByUserID([FromBody]UserModel objuser)
        {
            UserDataProvider objep = new UserDataProvider();
            objep.ApproveUserByUserID(objuser);

        }

        //Add user from admin dashboard
        [Authorize(Policy = "AdministratorOnly")]

        [HttpPost]
        public string AddUser([FromBody]UserModel objuser)
        {
            string opp = "";
            UserDataProvider objep = new UserDataProvider();
            return opp=objep.AddUser(objuser);
            
        }
        //To list Role
        [Authorize(Policy = "AdministratorOnly")]
        public List<UserRole> GetAllRoles()
        {
            UserDataProvider objep = new UserDataProvider();
            List<UserRole> listdata = objep.GetAllRoles();
            return listdata;
        }

        [Authorize(Policy = "AdministratorOnly")]

        [HttpPost]
        public void AddRoles([FromBody]UserRole objrole)
        {
            UserDataProvider objep = new UserDataProvider();
            objep.AddRole(objrole);

        }

        [Authorize(Policy = "AdministratorOnly")]
        [HttpPost]
        public UserModel FindUserByUserID([FromBody] UserModel objUser)
        {
            UserDataProvider objudp = new UserDataProvider();
            UserModel objum = objudp.FindUserByUserID(objUser.UserID);
            return objum;
        }

        [Authorize(Policy = "UserOnly")]
        [HttpPost]
        public UserModel FindUserForProfile([FromBody] UserModel objUser)
        {
            UserDataProvider objudp = new UserDataProvider();
            UserModel objum = objudp.FindUserByUserID(objUser.UserID);
            return objum;
        }
        [Authorize(Policy = "UserOnly")]
        [HttpPost]
        public UserModel FindUserByUserIDForProfile([FromBody] UserModel objUser)
        {
            UserDataProvider objudp = new UserDataProvider();
            UserModel objum = objudp.FindUserByUserID(objUser.UserID);
            return objum;
        }

        //Update User
        [Authorize(Policy = "AdministratorOnly")]
        [HttpPut]
        public void UpdateUser([FromBody] UserModel objUser)
        {
            UserDataProvider objudp = new UserDataProvider();
            objudp.UpdateUser(objUser);
           
        }

        [HttpPut]
        public void UpdateUserProfile([FromBody] UserModel objUser)
        {
            UserDataProvider objudp = new UserDataProvider();
            objudp.UpdateUserProfile(objUser);

        }
        //delete User
        [Authorize(Policy = "AdministratorOnly")]
        [HttpDelete]
        public void DeleteUser([FromBody] UserModel objUser)
        {
            UserDataProvider objDel = new UserDataProvider();
            objDel.DeleteUser(objUser.UserID);

        }


        //delete Roles
        [Authorize(Policy = "AdministratorOnly")]
        [HttpDelete]
        public void DeleteRole([FromBody] UserModel objUser)
        {
            UserDataProvider objDelRole = new UserDataProvider();
            objDelRole.DeleteRole(objUser.UserRoleID);

        }

        //handle login functions, redirect according to role
        [AllowAnonymous]
        public async Task<IActionResult> Login(UserModel objUserMod)
        {



            if (objUserMod.UserName !=null)
            {
               
                UserDataProvider objUDP = new UserDataProvider();
                UserModel objUM = objUDP.LoginUser(objUserMod);
                if (objUM != null)
                {
                    UserDetails.UserID = objUM.UserID; //This is only saved statically to be saved in cookie
                    UserDetails.Year = objUM.Year;
                    UserDetails.Programme = objUM.Programme;
                    const string Issuer = "http://localhost:49613";

                    var claims = new List<Claim>();

                    //claims.Add(new Claim(ClaimTypes.Name, "barry", ClaimValueTypes.String, Issuer));

                    claims.Add(new Claim(ClaimTypes.Role, objUM.Roles, ClaimValueTypes.String, Issuer));

                    var userIdentity = new ClaimsIdentity("SuperSecureLogin");
                    userIdentity.AddClaims(claims);
                    var userPrincipal = new ClaimsPrincipal(userIdentity);

                    await HttpContext.Authentication.SignInAsync("Cookie", userPrincipal,
                        new AuthenticationProperties
                        {
                            
                            IsPersistent = false,
                            AllowRefresh = false
                        });
                    if (objUM.IsActive==true)
                    {
                        if (objUM.UserRoleID == 1)
                        {
                            return RedirectToAction("UserHome", "User");
                        }
                        else
                        {
                            return RedirectToAction("Dashboard", "Exam");
                        }
                    }
                    else
                    {
                        return RedirectToAction("NotActivePage", "User");

                    }


                }

                else
                {
                    ViewData["Messege"] = "Wrong UserName or Password !!";
                    return View();
                }

              
            }
            else
            {
            return View();

            }

        }
        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("UserRegistration","User");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        public string UserRegistration([FromBody] UserModel data)
        {
            string objuser = "";
                data.UserRoleID = 1;
                UserDataProvider objUDP = new UserDataProvider();
            return objuser = objUDP.AddUser(data);
            
        }

        public IEnumerable<ExamsModel> GetPreviousExams()
        {
            UserDataProvider objUDP = new UserDataProvider();
            IEnumerable<ExamsModel> objExam = objUDP.GetPreviousExamDetails();
            return objExam;
        }

        public async Task<IActionResult> Logout()
        {
            await HttpContext.Authentication.SignOutAsync("Cookie");
            return RedirectToAction("Login", "User");
        }
    }
}
