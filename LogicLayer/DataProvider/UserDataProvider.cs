using LogicLayer.ModelEntities;
using LogicLayer.SQLHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogicLayer.DataProvider
{
    public class UserDataProvider
    {
        public string AddUser(UserModel objUser)
        {
            
            objUser.AddedOn = DateTime.Now;
            objUser.IsActive = false;
            var umodel = CheckUserName(objUser.UserName);
            if (umodel==null)
            {
                try
                {

                    List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", objUser.UserName));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@Email", objUser.Email));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@Password", objUser.Password));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@AddedOn", objUser.AddedOn));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@Gender", objUser.Gender));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsActive", objUser.IsActive));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserRoleID", objUser.UserRoleID));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objUser.Year));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objUser.Programme));
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@FullName", objUser.FullName));

                    SQLHandler SQLH = new SQLHandler();
                    SQLH.ExecuteNonQuery("[dbo].[SP_UserRegistration]", ParaMeterCollection);
                    return null;
                }
                catch (Exception)
                {

                    throw;
                }
            }
            else
            {
                return "Already Present";
            }
           
        }
        public UserModel CheckUserName(string UserName)
        {

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", UserName));
                SQLHandler SQLH = new SQLHandler();
                UserModel objusr = (SQLH.ExecuteAsObject<UserModel>("[dbo].[SP_GetAllFromUserName]", ParaMeterCollection));
                return objusr;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public UserModel LoginUser(UserModel objUser)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", objUser.UserName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Password", objUser.Password));




                SQLHandler SQLH = new SQLHandler();
                UserModel objusr = (SQLH.ExecuteAsObject<UserModel>("[dbo].[SP_UserLogin]", ParaMeterCollection));
                return objusr;
            }
            catch (Exception)
            {

                throw;
            }
        }

      

        public List<UserModel> GetAllUsers()
        {
            try
            {
                SQLHandler SQLH = new SQLHandler();
                List<UserModel> objuser = SQLH.ExecuteAsList<UserModel>("[dbo].[SP_GetAllUser]");
                return objuser;
            }
            catch (Exception)
            {

                throw;
            }
        }

        

         public void ApproveUserByUserID(UserModel objApprove)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objApprove.UserID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_MakeUserActive]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }

        }

        //Get users which are not approved
        public List<UserModel> GetUnaprrovedUsers()
        {
            try
            {
                SQLHandler SQLH = new SQLHandler();
                List<UserModel> objuser = SQLH.ExecuteAsList<UserModel>("[dbo].[SP_GetUnaprrovedUsers]");
                return objuser;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public UserModel FindUserByUserID(int UserID)
        {
            if (UserID==0)
            {
                UserID = UserDetails.UserID;
            }
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", UserID));

                SQLHandler SQLH = new SQLHandler();
                UserModel objum=SQLH.ExecuteAsObject<UserModel>("[dbo].[SP_FindUserByUserID]", ParaMeterCollection);
                return objum;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateUser(UserModel objUser)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objUser.UserID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@FullName", objUser.FullName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", objUser.UserName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Email", objUser.Email));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Password", objUser.Password));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Gender", objUser.Gender));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserRoleID", objUser.UserRoleID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objUser.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objUser.Programme));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_UpdateUser]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void UpdateUserProfile(UserModel objUser)
        {
            objUser.UserID = UserDetails.UserID;
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objUser.UserID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@FullName", objUser.FullName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", objUser.UserName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Email", objUser.Email));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Password", objUser.Password));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Gender", objUser.Gender));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objUser.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objUser.Programme));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_UpdateUserProfile]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        // to list roles
        public List<UserRole> GetAllRoles()
        {
            try
            {
                SQLHandler SQLH = new SQLHandler();
                List<UserRole> objrole = SQLH.ExecuteAsList<UserRole>("[dbo].[SP_GetAllRoles]");
                return objrole;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //today
        public void AddRole(UserRole objrole)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Roles", objrole.Roles));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddMyRole]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
            
        }

        //delete User
        public void DeleteUser(int UserID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", UserID));
           
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[sp_DeleteUser]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }


        public void DeleteRole(int UserRoleID)
        {
           int userid= UserDetails.UserID;
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserRoleID", UserRoleID));

                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_DeleteRole]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ExamsModel> GetPreviousExamDetails()
        {
            int UserID = UserDetails.UserID;
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", UserID));
                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objuser = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetPreviousExamsByUserID]", ParaMeterCollection);
                return objuser;
            }
            catch (Exception)
            {

                throw;
            }
        }
      
    }
}
