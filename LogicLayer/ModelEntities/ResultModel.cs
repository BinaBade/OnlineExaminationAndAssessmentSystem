using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogicLayer.ModelEntities
{
    public class ObjectiveResultModel : ObjAnswerModel
    {
        public int AnswerID { get; set; }
        public string AnswerCollection { get; set; }
        public string QuestionCollection { get; set; }
        public int UserSelectedAnswerID { get; set; }
        public bool Status { get; set; }
        public int QuestionID { get; set; }
        public int CorrectCount { get; set; }
       
    }

    public class SubjectiveResultModel:SubjectiveExamModel
    {
        public int UserID { get; set; }
        public int ExamID { get; set; }
        public string ExamName { get; set; }
        public int AnswerID { get; set; }
        public string AnswerCollection { get; set; }
        public string QuestionCollection { get; set; }

        public DateTime ExamDate { get; set; }
        public int Score { get; set; }
        public int QuestionID { get; set; }
        public string MarksString { get; set; }

        public decimal Marks { get; set; }
        public decimal TotalMarks { get; set; }



    }

    public class ResultModel
    {
        public int Score { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public int ExamID { get; set; }
        public int SubjectiveExamID { get; set; }

        public string ExamType { get; set; }
        public string ExamName { get; set; }
        public string SubjectiveExamName { get; set; }

        public DateTime ExamDate { get; set; }
        public string Programme { get; set; }
        public int Year { get; set; }
        public int TotalQuestions { get; set; }

    }
}