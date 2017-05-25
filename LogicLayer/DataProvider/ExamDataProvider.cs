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
    public class ExamDataProvider
    {

        public void AddSubject(SubjectModel objsub)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Subject", objsub.Subject_Name));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objsub.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objsub.Programme));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddSubject]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }
        }
        public void AddObjQuestionandAnswer(ObjAnswerModel objAns)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveQuestion", objAns.ObjectiveQue));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objAns.SubjectID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer1", objAns.Answer1));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer2", objAns.Answer2));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer3", objAns.Answer3));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer4", objAns.Answer4));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status1", objAns.Status1));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status2", objAns.Status2));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status3", objAns.Status3));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status4", objAns.Status4));





                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddObjQuestionandAnswer]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }


        }
        public List<SubjectModel> GetAllSubjects()
        {
            try
            {
                SQLHandler SQLH = new SQLHandler();
                List<SubjectModel> objsubject = SQLH.ExecuteAsList<SubjectModel>("[dbo].[SP_GetAllSubjects]");
                return objsubject;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ExamsModel AddExamName(ExamsModel objExam)
        {
            objExam.NoticePublishDate = DateTime.Now;
            objExam.NoticeMessege = "Exam Notice: For " + objExam.Year + "year " + objExam.Programme + " students. Exam " + objExam.ExamName + "has been scheduled on " + objExam.ScheduleExam.ToString();
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamName", objExam.ExamName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsActive", objExam.IsActive));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objExam.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamDuration", objExam.ExamDuration));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objExam.Programme));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ScheduleExam", objExam.ScheduleExam));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamType", objExam.ExamType));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticeMessege", objExam.NoticeMessege));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@NoticePublishDate", objExam.NoticePublishDate));


                SQLHandler SQLH = new SQLHandler();
                ExamsModel objEM = SQLH.ExecuteAsObject<ExamsModel>("[dbo].[SP_AddExamName]", ParaMeterCollection);
                return objEM;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public void AddQuestionsInExam(ObjQuestionsModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@QuestionID", objQue.ObjectiveQue_ID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objQue.ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddQuestionsInExam]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }


        }

        public List<ObjQuestionsModel> GetAllQuestionBySubjectID(ObjQuestionsModel objQue)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objQue.SubjectID));
                SQLHandler SQLH = new SQLHandler();

                List<ObjQuestionsModel> data = SQLH.ExecuteAsList<ObjQuestionsModel>("[dbo].[SP_GetQuestionsBySubjectID]", ParaMeterCollection);
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ObjQuestionsModel> GetQuestionsWithSubjectYearProgramme()
        {
            try
            {
                SQLHandler SQLH = new SQLHandler();
                List<ObjQuestionsModel> data = SQLH.ExecuteAsList<ObjQuestionsModel>("[dbo].[SP_GetQuestionsWithSubjectYearProgramme]");
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ObjectiveResultModel> GetSelectedQuestionByID(ObjectiveResultModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objQue.ExamID));
                SQLHandler SQLH = new SQLHandler();
                List<ObjectiveResultModel> objqes = SQLH.ExecuteAsList<ObjectiveResultModel>("[dbo].[SP_GetSelectedQuestionByID]", ParaMeterCollection);
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }
        public ObjectiveResultModel IsAlreadyAdded(ExamsModel objres)
        {
            objres.UserID = UserDetails.UserID;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objres.ExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", objres.UserID));

                SQLHandler SQLH = new SQLHandler();
                ObjectiveResultModel objqes = SQLH.ExecuteAsObject<ObjectiveResultModel>("[dbo].[SP_CheckAlreadyAdded]", ParaMeterCollection);
                return objqes;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void DeleteQuestionFromExam(ObjQuestionsModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveQueID", objQue.ObjectiveQue_ID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objQue.ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_DeleteQuestionFromExam]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }


        }
        public List<SubjectModel> GetSubjectsByYearAndProgramme(SubjectModel objExam)
        {
            try
            {


                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objExam.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objExam.Programme));

                SQLHandler SQLH = new SQLHandler();
                List<SubjectModel> objqes = SQLH.ExecuteAsList<SubjectModel>("[dbo].[SP_GetAllSubjectByYearAndProgramme]", ParaMeterCollection);
                return objqes;
            }
            catch (Exception)
            {

                throw;
            }
        }

        //public void AddSelectedQuestions(ObjQuestionsModel objQue)
        //{
        //    try
        //    {


        //        List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

        //        ParaMeterCollection.Add(new KeyValuePair<string, object>("@QuestionID", objQue.ObjectiveQue_ID));

        //        SQLHandler SQLH = new SQLHandler();
        //        SQLH.ExecuteAsTable("[dbo].[GetQuestionsfromIDinTableType]", ParaMeterCollection, true);
        //    }
        //    catch (Exception)
        //    {

        //        throw;
        //    }
        //}

        public List<ObjAnswerModel> DisplayObjectiveExam(ExamsModel objExam)
        {
            try
            {
                var ExamIDPresent = IsAlreadyAdded(objExam);
                if (ExamIDPresent.CorrectCount == 0)
                {
                    List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objExam.ExamID));
                    SQLHandler SQLH = new SQLHandler();
                    List<ObjAnswerModel> objqes = SQLH.ExecuteAsList<ObjAnswerModel>("[dbo].[SP_DisplayObjectiveExam]", ParaMeterCollection);
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

        public List<ExamsModel> GetAllExamsByYearProgramme()
        {
            int years = UserDetails.Year;
            string Programme = UserDetails.Programme;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", years));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", Programme));

                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objsubject = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetAllExamsByYearAndProgramme]", ParaMeterCollection);
                return objsubject;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ExamsModel> GetAllMockTestByYearProgramme()
        {
            int years = UserDetails.Year;
            string Programme = UserDetails.Programme;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", years));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", Programme));

                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objsubject = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetAllMockTestByYearAndProgramme]", ParaMeterCollection);
                return objsubject;
            }
            catch (Exception)
            {

                throw;
            }
        }
    
        public void AddSubjectiveQuestion(SubjectiveQuestionAnswerModel objSub) 
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveQue", objSub.SubjectiveQue));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objSub.SubjectID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddSubjectiveQue]", ParaMeterCollection);

            }
            catch (Exception)
            {

                throw;
            }
        }
        public SubjectiveExamModel AddSubjectiveExam(SubjectiveExamModel objExam)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamName", objExam.SubjectiveExamName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@IsActive", objExam.IsActive));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objExam.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamDuration", objExam.SubjectiveExamDuration));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objExam.Programme));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ScheduleExam", objExam.ScheduleExam));


                

                SQLHandler SQLH = new SQLHandler();
                SubjectiveExamModel objEM = SQLH.ExecuteAsObject<SubjectiveExamModel>("[dbo].[SP_AddSubjectiveExam]", ParaMeterCollection);
                return objEM;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<SubjectiveQuestionAnswerModel> GetSubjectiveQuestionBySubjectID(SubjectiveQuestionAnswerModel objQue)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objQue.SubjectID));
                SQLHandler SQLH = new SQLHandler();

                List<SubjectiveQuestionAnswerModel> data = SQLH.ExecuteAsList<SubjectiveQuestionAnswerModel>("[dbo].[SP_GetSubjectiveQuestionBySubjectID]", ParaMeterCollection);
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void AddSubjectiveQueInSubjectiveExam(SubjectiveQuestionAnswerModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@QuestionID", objQue.SubjectiveQue_ID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objQue.SubjectiveExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_AddSubjectiveQueInSubjectiveExam]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }


        }
        public List<SubjectiveQuestionAnswerModel> GetSelectedSubjectiveQueByExamID(SubjectiveQuestionAnswerModel objQue)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objQue.SubjectiveExamID));
                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveQuestionAnswerModel> objqes = SQLH.ExecuteAsList<SubjectiveQuestionAnswerModel>("[dbo].[SP_GetSelectedSubjectiveQuestionBySubExamID]", ParaMeterCollection);
                return objqes;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void DeleteSubjectiveQueFromSubjectiveExam(SubjectiveQuestionAnswerModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveQueID", objQue.SubjectiveQue_ID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objQue.SubjectiveExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_DeleteSubjectiveQuestionFromExam]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }


        }

        public List<ObjAnswerModel> GetQuestionDetailsWithAnswers(ObjQuestionsModel objQue)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveQue_ID", objQue.ObjectiveQue_ID));
                SQLHandler SQLH = new SQLHandler();
                List<ObjAnswerModel> objqes = SQLH.ExecuteAsList<ObjAnswerModel>("[dbo].[SP_GetQuestionDetailsWithAnswers]", ParaMeterCollection);
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ExamsModel> GetAllExams()
        {
            try
            {

                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objqes = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetAllExams]");
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }

        
        public void ActivateExam(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_ActivateExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeactivateExam(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_DeactivateExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw; 
            }
        }

        public void RestartExam(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_RestartExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw; 
            }
        }

        public void FinishExam(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_FinishExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteExam(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler(); 
                SQLH.ExecuteNonQuery("[dbo].[SP_DeleteExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public ExamsModel EditExamByID(int ExamID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", ExamID));
                SQLHandler SQLH = new SQLHandler(); 
                ExamsModel objexam=SQLH.ExecuteAsObject<ExamsModel>("[dbo].[SP_EditExamByID]", ParaMeterCollection);
                return objexam;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateExam(ExamsModel objexam)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamID", objexam.ExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamName", objexam.ExamName));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ExamDuration", objexam.ExamDuration));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ScheduleExam", objexam.ScheduleExam));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objexam.Year));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objexam.Programme));

                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_UpdateExam]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SubjectiveExamModel> GetAllSubjectiveExamsByYearProgramme()
        {
            int years = UserDetails.Year;
            string Programme = UserDetails.Programme;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();

                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", years));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", Programme));

                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveExamModel> objsubject = SQLH.ExecuteAsList<SubjectiveExamModel>("[dbo].[SP_GetAllSubjectiveExamsByYearAndProgramme]", ParaMeterCollection);
                return objsubject;
            }
            catch (Exception)
            {

                throw;
            }
        }

        
         public List<SubjectiveQuestionAnswerModel> DisplaySubectiveExam(SubjectiveExamModel objExam)
        {
            try
            {
                var ExamIDPresent = IsSubjectiveExamAlreadyAdded(objExam);
                if (ExamIDPresent.CorrectCount == 0)
                {
                    List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                    ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objExam.SubjectiveExamID));
                    SQLHandler SQLH = new SQLHandler();
                    List<SubjectiveQuestionAnswerModel> objqes = SQLH.ExecuteAsList<SubjectiveQuestionAnswerModel>("[dbo].[SP_DisplaySubjectiveExam]", ParaMeterCollection);
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

        public SubjectiveExamModel IsSubjectiveExamAlreadyAdded(SubjectiveExamModel objres)
        {
            int UserID = UserDetails.UserID;
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectiveExamID", objres.SubjectiveExamID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@UserID", UserID));

                SQLHandler SQLH = new SQLHandler();
                SubjectiveExamModel objqes = SQLH.ExecuteAsObject<SubjectiveExamModel>("[dbo].[SP_CheckSubjectiveAlreadyAdded]", ParaMeterCollection);
                return objqes;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ExamsModel> GetFinishedExams()
        {
            try
            {

                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objqes = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetFinishedExams]");
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<SubjectiveExamModel> GetFinishedSubjectiveExams()
        {
            try
            {

                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveExamModel> objqes = SQLH.ExecuteAsList<SubjectiveExamModel>("[dbo].[SP_GetFinishedSubjectiveExams]");
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }
        public List<ExamsModel> GetAllNotice()
        {
            try
            {

                SQLHandler SQLH = new SQLHandler();
                List<ExamsModel> objqes = SQLH.ExecuteAsList<ExamsModel>("[dbo].[SP_GetAllNotice]");
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<SubjectiveExamModel> GetAllSubjectiveExams()
        {
            try
            {

                SQLHandler SQLH = new SQLHandler();
                List<SubjectiveExamModel> objqes = SQLH.ExecuteAsList<SubjectiveExamModel>("[dbo].[SP_GetAllSubjectiveExams]");
                return objqes;


            }
            catch (Exception)
            {

                throw;
            }
        }

        public SubjectModel GetFromSubjectID(int SubjectID)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", SubjectID));
                SQLHandler SQLH = new SQLHandler();
                SubjectModel objqes = SQLH.ExecuteAsObject<SubjectModel>("[dbo].[SP_GetFromSubjectID]", ParaMeterCollection);
                return objqes;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateObjQuestionandAnswer(ObjAnswerModel objAns)
        {
            try
            {

                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveQue_ID", objAns.ObjectiveQue_ID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveQuestion", objAns.ObjectiveQue));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objAns.SubjectID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer1", objAns.Answer1));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer2", objAns.Answer2));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer3", objAns.Answer3));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Answer4", objAns.Answer4));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status1", objAns.Status1));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status2", objAns.Status2));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status3", objAns.Status3));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Status4", objAns.Status4));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveAns_ID1", objAns.ObjectiveAns_ID1));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveAns_ID2", objAns.ObjectiveAns_ID2));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveAns_ID3", objAns.ObjectiveAns_ID3));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@ObjectiveAns_ID4", objAns.ObjectiveAns_ID4));


                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_UpdateObjQuestionandAnswer]", ParaMeterCollection);
            }
            catch
            {
                throw;
            }
        }

        public void UpdateSubject(SubjectModel objsub)
        {
            try
            {
                 List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objsub.SubjectID));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Subject_Name", objsub.Subject_Name));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Programme", objsub.Programme));
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@Year", objsub.Year));


                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_UpdateSubject]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteSubject(SubjectModel objsub)
        {
            try
            {
                List<KeyValuePair<string, object>> ParaMeterCollection = new List<KeyValuePair<string, object>>();
                ParaMeterCollection.Add(new KeyValuePair<string, object>("@SubjectID", objsub.SubjectID));
                SQLHandler SQLH = new SQLHandler();
                SQLH.ExecuteNonQuery("[dbo].[SP_DeleteSubject]", ParaMeterCollection);
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
