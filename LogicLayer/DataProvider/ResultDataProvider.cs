using LogicLayer.ModelEntities;
using LogicLayer.SQLHelper;
using Microsoft.SqlServer.Server;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace LogicLayer.DataProvider
{
    public class ResultDataProvider
    {
        public void UserExamWithAnswerID(ObjectiveResultModel objResult)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                var AllData = GetAllUserAnswers(objResult);
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ResultType", AllData));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteAsTable("[dbo].[SP_AddUserExamWithAnswerIDByType]", ParaMeterCollection, true);
            }
            catch (Exception)
            {

                throw;
            }


        }
        public List<SqlDataRecord> GetAllUserAnswers(ObjectiveResultModel objResult)
        {
            try
            {


                List<SqlDataRecord> datatable = new List<SqlDataRecord>();
                SqlMetaData[] sqlMetaData = new SqlMetaData[5];

                sqlMetaData[0] = new SqlMetaData("UserID", SqlDbType.Int);
                sqlMetaData[1] = new SqlMetaData("ExamID", SqlDbType.Int);
                sqlMetaData[2] = new SqlMetaData("AnswerID", SqlDbType.Int);
                sqlMetaData[3] = new SqlMetaData("ObjectiveQue_ID", SqlDbType.Int);
                sqlMetaData[4] = new SqlMetaData("ExamDate", SqlDbType.DateTime);
                SqlDataRecord row = new SqlDataRecord(sqlMetaData);
                objResult.ExamDate = DateTime.Now;
                objResult.UserID = UserDetails.UserID;
                string[] checkvalue = SpereateComma(objResult.AnswerCollection);
                string[] checkquestion = SpereateComma(objResult.QuestionCollection);

                for (int i = 0; i < checkvalue.Length; i++)
                {

                    if (checkvalue[i] != "")
                    {

                        int AnswerID = Convert.ToInt32(checkvalue[i]);
                        int QuestionID = Convert.ToInt32(checkquestion[i]);
                        row.SetValues(new object[] { objResult.UserID, objResult.ExamID, AnswerID, QuestionID, objResult.ExamDate });
                        datatable.Add(row);
                        row = new SqlDataRecord(sqlMetaData);
                    }
                }




                return datatable;

            }
            catch
            {
                throw;
            }


        }
        public void SubjectiveExamWithAnswer(SubjectiveQuestionAnswerModel objsub)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                var AllData = UserSubjectiveAnswers(objsub);
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ResultType", AllData));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteAsTable("[dbo].[SP_AddSubjectiveExamOfUserWithAnswerByType]", ParaMeterCollection, true);
            }
            catch (Exception)
            {

                throw;
            }


        }
        public List<SqlDataRecord> UserSubjectiveAnswers(SubjectiveQuestionAnswerModel objResult)
        {
            try
            {


                List<SqlDataRecord> datatable = new List<SqlDataRecord>();
                SqlMetaData[] sqlMetaData = new SqlMetaData[5];

                sqlMetaData[0] = new SqlMetaData("UserID", SqlDbType.Int);
                sqlMetaData[1] = new SqlMetaData("SubjectiveExamID", SqlDbType.Int);
                sqlMetaData[2] = new SqlMetaData("SubjectiveQue_ID", SqlDbType.Int);
                sqlMetaData[3] = new SqlMetaData("SubjectiveAnswer", SqlDbType.Text);
                sqlMetaData[4] = new SqlMetaData("ExamDate", SqlDbType.DateTime);
                SqlDataRecord row = new SqlDataRecord(sqlMetaData);
                objResult.ExamDate = DateTime.Now;
                objResult.UserID = UserDetails.UserID;
                string[] checkvalue = SpereateComma(objResult.SubAnswerCollection);
                string[] checkquestion = SpereateComma(objResult.SubQuestionCollection);

                for (int i = 0; i < checkvalue.Length; i++)
                {

                    if (checkvalue[i] != "")
                    {

                        string Answer = (checkvalue[i].ToString());
                        int QuestionID = Convert.ToInt32(checkquestion[i]);
                        row.SetValues(new object[] { objResult.UserID, objResult.SubjectiveExamID,QuestionID, Answer, objResult.ExamDate });
                        datatable.Add(row);
                        row = new SqlDataRecord(sqlMetaData);
                    }
                }




                return datatable;

            }
            catch
            {
                throw;
            }


        }
        public ObjectiveResultModel GetMyExamScore(ObjectiveResultModel objres)
        {
            objres.UserID = UserDetails.UserID;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objres.ExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objres.UserID));

                SQLHandler SQLH = new SQLHandler();
                ObjectiveResultModel objqes = SQLH.ExecuteAsObject<ObjectiveResultModel>("[dbo].[SP_CountScoreByUserExam]", ParaMeterCollection);
                if (objqes==null)
                {
                    ObjectiveResultModel result = new ObjectiveResultModel();
                    result.Score = 0;
                    return result;
                }
                else
                {
                    return objqes;

                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ObjectiveResultModel> GetMyExamAnswers(ObjectiveResultModel objres)
        {
            objres.UserID = UserDetails.UserID;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objres.ExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objres.UserID));

                SQLHandler SQLH = new SQLHandler();
                List<ObjectiveResultModel> objqes = SQLH.ExecuteAsList<ObjectiveResultModel>("[dbo].[SP_UserAnswersWithCorrectAnswers]", ParaMeterCollection);
                return objqes;
                
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        
        public List<ObjAnswerModel> MockAnswersOfExam(ExamsModel objExam)
        {
            try
            {
                    List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objExam.ExamID));
                    SQLHandler SQLH = new SQLHandler();
                    List<ObjAnswerModel> objqes = SQLH.ExecuteAsList<ObjAnswerModel>("[dbo].[SP_DisplayMockTest]", ParaMeterCollection);
                    return objqes;
             
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void AddSubjectiveMarks(SubjectiveQuestionAnswerModel objResult)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                var AllData = GetAllMarksCollection(objResult);
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@MarksType", AllData));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteAsTable("[dbo].[SP_AddSubjectiveMarksByType]", ParaMeterCollection, true);
            }
            catch (Exception)
            {

                throw;
            }


        }
        public List<SqlDataRecord> GetAllMarksCollection(SubjectiveQuestionAnswerModel objResult)
        {
            try
            {


                List<SqlDataRecord> datatable = new List<SqlDataRecord>();
                SqlMetaData[] sqlMetaData = new SqlMetaData[4];

                sqlMetaData[0] = new SqlMetaData("UserID", SqlDbType.Int);
                sqlMetaData[1] = new SqlMetaData("SubjectiveExamID", SqlDbType.Int);
                sqlMetaData[2] = new SqlMetaData("QuestionID", SqlDbType.Int);
                sqlMetaData[3] = new SqlMetaData("Marks", SqlDbType.Int);
                SqlDataRecord row = new SqlDataRecord(sqlMetaData);
                string[] checkmarks = SpereateComma(objResult.MarksCollection);
                string[] checkquestion = SpereateComma(objResult.SubQuestionCollection);

                for (int i = 0; i < checkmarks.Length; i++)
                {

                    if (checkmarks[i] != "")
                    {

                        int Marks = Convert.ToInt32(checkmarks[i]);
                        int QuestionID = Convert.ToInt32(checkquestion[i]);
                        row.SetValues(new object[] { objResult.UserID, objResult.SubjectiveExamID, QuestionID, Marks });
                        datatable.Add(row);
                        row = new SqlDataRecord(sqlMetaData);
                    }
                }




                return datatable;

            }
            catch
            {
                throw;
            }


        }

        public string[] SpereateComma(string value)
        {

            string[] values = value.Split(',');
            for (int i = 0; i < values.Length; i++)
            {

                values[i] = values[i].Trim();


            }
            return values;
        }
        public void PublishObjectiveResult(ExamsModel objexam)
        {
            objexam.NoticeMessege = "Result Published(Objective Exam): " + objexam.ExamName + "," + objexam.Year + "," + objexam.Programme;
            objexam.NoticePublishDate = DateTime.Now;

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objexam.ExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticeMessege", objexam.NoticeMessege));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticeDate", objexam.NoticePublishDate));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_PublishResult]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }


        }
        public void PublishSubjectiveResult(SubjectiveExamModel objexam)
        {
            string NoticeMessege = "Result Published(Subjective Exam): " + objexam.SubjectiveExamName + "," + objexam.Year + "," + objexam.Programme;
            DateTime NoticePublishDate = DateTime.Now;

            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objexam.SubjectiveExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticeMessege", NoticeMessege));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticeDate", NoticePublishDate));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_PublishSubjectiveResult]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }


        }
        public List<SubjectiveExamModel> GetSubjectiveExamgiven(UserModel objUser)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objUser.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objUser.Programme));

                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveExamModel> objqes = SQLH.ExecuteAsList<SubjectiveExamModel>("[dbo].[SP_GetFinishedSubjectiveExamsByYearProgramme]", ParaMeterCollection);
                return objqes;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<UserModel> GetUsersFromSubjectiveExam(SubjectiveExamModel objUser)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objUser.SubjectiveExamID));
                SQLHandler SQLH = new SQLHandler();
                List<UserModel> objqes = SQLH.ExecuteAsList<UserModel>("[dbo].[SP_GetUsersFromSubjectiveExam]", ParaMeterCollection);
                return objqes;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SubjectiveQuestionAnswerModel> GetSubQuestionAnswers(SubjectiveQuestionAnswerModel objUser)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objUser.UserID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objUser.SubjectiveExamID));
                var numofrows=CheckIfSubjectiveExamChecked(objUser.UserID, objUser.SubjectiveExamID);
                if (numofrows.Count==0)
                {
                    SQLHandler SQLH = new SQLHandler();
                    List<SubjectiveQuestionAnswerModel> objqes = SQLH.ExecuteAsList<SubjectiveQuestionAnswerModel>("[dbo].[SP_GetSubjectiveQuestionAnswers]", ParaMeterCollection);
                    return objqes;
                }
                else
                {
                    return null;
                }
               

            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SubjectiveQuestionAnswerModel> CheckIfSubjectiveExamChecked(int UserID,int SubjectiveExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", UserID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", SubjectiveExamID));
                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveQuestionAnswerModel> objqes = SQLH.ExecuteAsList<SubjectiveQuestionAnswerModel>("[dbo].[SP_CheckIfSubjectiveExamChecked]", ParaMeterCollection);
                return objqes;

            }
            catch (Exception)
            {

                throw;
            }
        }

        public ResultModel GetMyObjectiveMarks(ResultModel objresu)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", objresu.UserName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objresu.ExamID));
                SQLHandler SQLH = new SQLHandler();
                ResultModel objqes = SQLH.ExecuteAsObject<ResultModel>("[dbo].[SP_GetResultByUserName]", ParaMeterCollection);
                return objqes;

            }
            catch (Exception)
            {

                throw;
            }
        }


        public ResultModel GetMySubjectiveMarks(ResultModel data)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserName", data.UserName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", data.ExamID));
                SQLHandler SQLH = new SQLHandler();
                ResultModel objqes = SQLH.ExecuteAsObject<ResultModel>("[dbo].[SP_GetSubjectiveResultByUserName]", ParaMeterCollection);
                return objqes;

            }
            catch (Exception)
            {

                throw;
            }
        }





}
}
