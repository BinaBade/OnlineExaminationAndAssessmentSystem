using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogicLayer.ModelEntities
{
    public class UserModel:UserRole
    {
        public int UserID { get; set; }
        public string FullName { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }

        public string Programme { get; set; }
        public int Year { get; set; }
        public bool IsActive { get; set; }
        public DateTime AddedOn { get; set; }
       
    }

    public class UserRole
    {
        public int UserRoleID { get; set; }
        public string Roles { get; set; }
    }
    
    public static class UserDetails
    {
        public static int UserID { get; set; }
        public static int Year { get; set; }
        public static string Programme { get; set; }

    }
}
