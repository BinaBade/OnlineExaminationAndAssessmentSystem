using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using LogicLayer.ModelEntities;
using LogicLayer.DataProvider;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineExamination.Controllers
{

    public class ExamController : Controller
    {

        // GET: /<controller>/
        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult SubjectsAdd()
        {

            return View();


        }

        public void AddSubject([FromBody] SubjectModel objsub)
        {
            ExamDataProvider objExam = new ExamDataProvider();
            objExam.AddSubject(objsub);
        }
        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult Dashboard()
        {
            return View();
        }


        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult ExamsAdd()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult SubjectiveQueAdd()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult SubjectiveExamAdd()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult QuestionList()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult PublishResult()
        {
            return View();
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult PublishSubjectiveResult()
        {
            return View();
        }
        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult CheckSubjectiveAnswer()
        {
            return View();
        }

        public IActionResult Notice()
        {
            return View();
        }

        public IActionResult DisplayObjExam()
        {
            return View();
        }

        public IActionResult DisplaySubjectiveExam()
        {
            return View();
        }

        public IActionResult ExamsAndTest()
        {
            return View();
        }

        public IActionResult Results()
        {
            return View();
        }
        public IActionResult MockTest()
        {
            return View();
        }
       

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult ExamListAndSchedule()
        {
            return View();
        }
        [HttpGet]
        public IActionResult ObjQuestionandAnswerAdd()
        {


            return View();

        }
        [HttpPost]
        public void ObjQuestionandAnswerAdd([FromBody]ObjAnswerModel data)
        {
                ExamDataProvider objEDP = new ExamDataProvider();
                objEDP.AddObjQuestionandAnswer(data);
        }
        [Authorize("AdministratorOnly")]
        public IActionResult AddObjectiveQuestion()
        {
            return View();
        }

        public List<SubjectModel> GetAllSubject()
        {
            ExamDataProvider objep = new ExamDataProvider();
            List<SubjectModel> listdata = objep.GetAllSubjects();
            return listdata;
        }

        [HttpPost]
        public List<SubjectModel> GetSubjectByYear([FromBody] SubjectModel objSub)
        {
            ExamDataProvider objep = new ExamDataProvider();
            List<SubjectModel> listdata = objep.GetSubjectsByYearAndProgramme(objSub);
            return listdata;
        }

        [HttpPost]
        public List<ObjQuestionsModel> GetAllQuestionBySubjectID([FromBody]ObjQuestionsModel objQue)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            List<ObjQuestionsModel> QueList = objEDP.GetAllQuestionBySubjectID(objQue);
            return QueList;
        }

        [Authorize(Policy = "AdministratorOnly")]
        public IActionResult ExamAdd()
        {
            return View();
        }

        [HttpPost]
        public ExamsModel AddExamName([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            ExamsModel objEM = objEDP.AddExamName(objexam);
            return objEM;
        }

        [HttpPost]
        public void AddQuestionsInExam([FromBody] ObjQuestionsModel objQM)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.AddQuestionsInExam(objQM);

        }
        [HttpPost]
        public IEnumerable<ObjectiveResultModel> GetSelectedQuestionByID([FromBody] ObjectiveResultModel objQue)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ObjectiveResultModel> QueList = objEDP.GetSelectedQuestionByID(objQue);
            return QueList;
        }

        [HttpPost]
        public void DeleteObjectiveQuestionFromExam([FromBody] ObjQuestionsModel objSub)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.DeleteQuestionFromExam(objSub);
        }
        public List<ExamsModel> GetAllExams()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            List<ExamsModel> ExamList = objEDP.GetAllExamsByYearProgramme();
            return ExamList;
        }

        public List<ExamsModel> GetAllMockTest()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            List<ExamsModel> ExamList = objEDP.GetAllMockTestByYearProgramme();
            return ExamList;
        }


        [HttpPost]
        public IEnumerable<ObjAnswerModel> DisplayObjectiveExam([FromBody]ExamsModel objExam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ObjAnswerModel> ExamList = objEDP.DisplayObjectiveExam(objExam);
            return ExamList;
        }

        [HttpPost]
        public void AddSubjectiveQuestion([FromBody] SubjectiveQuestionAnswerModel objSub) //To adding Subjective questions
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.AddSubjectiveQuestion(objSub);
        }
        [HttpPost]
        public SubjectiveExamModel AddSubjectiveExam([FromBody] SubjectiveExamModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            SubjectiveExamModel objEM = objEDP.AddSubjectiveExam(objexam);
            return objEM;
        }


        [HttpPost]
        public List<SubjectiveQuestionAnswerModel> GetSubjectiveQuestionBySubjectID([FromBody]SubjectiveQuestionAnswerModel objQue)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            List<SubjectiveQuestionAnswerModel> QueList = objEDP.GetSubjectiveQuestionBySubjectID(objQue);
            return QueList;
        }

        [HttpPost]
        public void AddSubjectiveQueInSubjectiveExam([FromBody] SubjectiveQuestionAnswerModel objQM)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.AddSubjectiveQueInSubjectiveExam(objQM);

        }

        [HttpPost]
        public IEnumerable<SubjectiveQuestionAnswerModel> GetSelectedSubjectiveQuestionByExamID([FromBody]SubjectiveQuestionAnswerModel objQue)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<SubjectiveQuestionAnswerModel> QueList = objEDP.GetSelectedSubjectiveQueByExamID(objQue);
            return QueList;
        }

        [HttpPost]
        public void DeleteSubjectiveQuestionFromExam([FromBody] SubjectiveQuestionAnswerModel objSub)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.DeleteSubjectiveQueFromSubjectiveExam(objSub);
        }

        [HttpPost]
        public void UserExamWithAnswerID([FromBody] ObjectiveResultModel objResult)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            objEDP.UserExamWithAnswerID(objResult);
        }

        [HttpPost]
        public ObjectiveResultModel GetMyExamScore([FromBody] ObjectiveResultModel objexam)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            ObjectiveResultModel objEM = objEDP.GetMyExamScore(objexam);
            return objEM;
        }

        [HttpPost]
        // To view questions and answer while viewing Mocktest result
        public IEnumerable<ObjectiveResultModel> GetMyExamAnswers([FromBody] ObjectiveResultModel objexam)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            IEnumerable<ObjectiveResultModel> objEM = objEDP.GetMyExamAnswers(objexam);
            return objEM;
        }

        [HttpPost]
        //
        public IEnumerable<ObjAnswerModel> GetMockTestQuestions([FromBody] ExamsModel objexam)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            IEnumerable<ObjAnswerModel> objEM = objEDP.MockAnswersOfExam(objexam);
            return objEM;
        }

        [HttpGet]
        [Authorize("AdministratorOnly")]
        public IEnumerable<ObjQuestionsModel> GetQuestionsWithSubjectYearProgramme()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ObjQuestionsModel> objEM = objEDP.GetQuestionsWithSubjectYearProgramme();
            return objEM;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public IEnumerable<ObjAnswerModel> GetQuestionDetailsWithAnswers([FromBody] ObjQuestionsModel objque)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ObjAnswerModel> objEM = objEDP.GetQuestionDetailsWithAnswers(objque);
            return objEM;
        }

        [HttpGet]
        [Authorize("AdministratorOnly")]
        public IEnumerable<ExamsModel> GetAllExamListForAdmin()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ExamsModel> objEM = objEDP.GetAllExams();
            return objEM;
        }

        [HttpPost]
        public void ActivateExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.ActivateExam(objexam.ExamID);
        }

        [HttpPost]
        public void DeactivateExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.DeactivateExam(objexam.ExamID);
        }

        [HttpPost]
        public void RestartExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.RestartExam(objexam.ExamID); 
        }
        [HttpPost]
        public void FinishExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.FinishExam(objexam.ExamID);
        }

        [HttpPost]
        public void DeleteExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.DeleteExam(objexam.ExamID);
        }

        [HttpPost]
        public ExamsModel EditExamByID([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
             objexam = objEDP.EditExamByID(objexam.ExamID);
            return objexam;
        }

        [HttpPost]
        public void UpdateExam([FromBody] ExamsModel objexam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.UpdateExam(objexam);
        }

        public List<SubjectiveExamModel> GetAllSubjectiveExamsUser()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            List<SubjectiveExamModel> ExamList = objEDP.GetAllSubjectiveExamsByYearProgramme();
            return ExamList;

        }

        

        [HttpPost]
        public IEnumerable<SubjectiveExamModel> DisplaySubjectiveExam([FromBody]SubjectiveExamModel objExam)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<SubjectiveExamModel> ExamList = objEDP.DisplaySubectiveExam(objExam);
            return ExamList;
        }

        [HttpGet]
        [Authorize("AdministratorOnly")]
        public IEnumerable<ExamsModel> GetFinishedExams()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ExamsModel> objEM = objEDP.GetFinishedExams();
            return objEM;
        }
        [HttpGet]
        [Authorize("AdministratorOnly")]
        public IEnumerable<SubjectiveExamModel> GetFinishedSubjectiveExams()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<SubjectiveExamModel> objEM = objEDP.GetFinishedSubjectiveExams();
            return objEM;
        }

        

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void PublishObjectiveResult([FromBody] ExamsModel objSub)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            objEDP.PublishObjectiveResult(objSub);
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void PublishSubjectiveResult([FromBody] SubjectiveExamModel objSub)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            objEDP.PublishSubjectiveResult(objSub);
        }
        [HttpPost]
        public void SubjectiveExamWithAnswer([FromBody] SubjectiveQuestionAnswerModel objSub)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            objEDP.SubjectiveExamWithAnswer(objSub);
        }

        [HttpGet]
        public IEnumerable<ExamsModel> GetAllNotice()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<ExamsModel> objEM = objEDP.GetAllNotice();
            return objEM;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public IEnumerable<SubjectiveExamModel> GetSubjectiveExamGiven([FromBody] UserModel objque)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            IEnumerable<SubjectiveExamModel> objEM = objEDP.GetSubjectiveExamgiven(objque);
            return objEM;
        }

        [HttpGet]
        [Authorize("AdministratorOnly")]
        public IEnumerable<SubjectiveExamModel> GetAllSubjectiveExams()
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            IEnumerable<SubjectiveExamModel> objEM = objEDP.GetAllSubjectiveExams();
            return objEM;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public IEnumerable<UserModel> GetUsersFromSubjectiveExam([FromBody] SubjectiveExamModel objque)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            IEnumerable<UserModel> objEM = objEDP.GetUsersFromSubjectiveExam(objque);
            return objEM;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public IEnumerable<SubjectiveQuestionAnswerModel> GetSubQuestionAnswers([FromBody] SubjectiveQuestionAnswerModel objque)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            IEnumerable<SubjectiveQuestionAnswerModel> objEM = objEDP.GetSubQuestionAnswers(objque);
            return objEM;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void AddSubjectiveMarks([FromBody] SubjectiveQuestionAnswerModel objsub)
        {
            ResultDataProvider rdp = new ResultDataProvider();
            rdp.AddSubjectiveMarks(objsub);
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public SubjectModel GetFromSubjectID([FromBody] SubjectModel objsub)
        {
            ExamDataProvider rdp = new ExamDataProvider();
           SubjectModel sub= rdp.GetFromSubjectID(objsub.SubjectID);
            return sub;
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void UpdateObjQuestionandAnswer([FromBody]ObjAnswerModel data)
        {
                ExamDataProvider objEDP = new ExamDataProvider();
                objEDP.UpdateObjQuestionandAnswer(data);
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void UpdateSubject([FromBody] SubjectModel data)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.UpdateSubject(data);
        }

        [HttpPost]
        [Authorize("AdministratorOnly")]
        public void DeleteSubject([FromBody] SubjectModel data)
        {
            ExamDataProvider objEDP = new ExamDataProvider();
            objEDP.DeleteSubject(data);
        }

        [HttpPost]
        [Authorize("UserOnly")]
        public ResultModel GetMyResult([FromBody] ResultModel data)
        {
            ResultDataProvider objEDP = new ResultDataProvider();
            if (data.ExamType=="Objective")
            {
                ResultModel rm = objEDP.GetMyObjectiveMarks(data);
                return rm;
            }
            else
            {
                ResultModel rm = objEDP.GetMySubjectiveMarks(data);
                return rm;
            }
            
        }




    }
}
