using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LogicLayer.ModelEntities
{
    public class SubjectModel
    {
        public int SubjectID { get; set; }
        public string Subject_Name { get; set; }
        public string Programme { get; set; }
        public int Year { get; set; }

    }

    public class ExamsModel : SubjectModel
    {
        public int UserID { get; set; }
        public int ExamID { get; set; }
        public string UserName { get; set; }
        public string ExamName { get; set; }
        public DateTime ExamDate { get; set; }
        public int ExamDuration { get; set; }
        public int TotalQuestions { get; set; }
        public int Score { get; set; }
        public bool IsActive { get; set; }
        public bool IsDeleted { get; set; }

        public bool IsFinished { get; set; }
        public DateTime ScheduleExam { get; set; }
        public string ExamType { get; set; }
        public string NoticeMessege { get; set; }
        public string NoticeType { get; set; }
        public DateTime NoticePublishDate{get;set;}
        public int NoticeID { get; set; }
        public bool ResultPublished { get; set; }



    }
    public class ObjQuestionsModel : ExamsModel
    {
        public int ObjectiveQue_ID { get; set; }
        public string ObjectiveQue { get; set; }


    }

    public class ObjAnswerModel : ObjQuestionsModel
    {
        public int ObjectiveAns_ID { get; set; }
        public int ObjectiveAns_ID1 { get; set; }
        public int ObjectiveAns_ID2 { get; set; }
        public int ObjectiveAns_ID3 { get; set; }
        public int ObjectiveAns_ID4 { get; set; }

        public string Answer1 { get; set; }
        public string Answer2 { get; set; }
        public string Answer3 { get; set; }
        public string Answer4 { get; set; }

        public bool Status1 { get; set; }
        public bool Status2 { get; set; }
        public bool Status3 { get; set; }
        public bool Status4 { get; set; }
        public bool Status { get; set; }


        public string ObjectiveAns { get; set; }
    }
    public class SubjectiveExamModel : SubjectModel
    {
        public int UserID { get; set; }
        public int SubjectiveExamID { get; set; }
        public string SubjectiveExamName { get; set; }
        public int SubjectiveExamDuration { get; set; }
        public bool IsActive { get; set; }
        public DateTime ExamDate { get; set; }
        public int CountQuestions { get; set; }
        public int Score { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime ScheduleExam { get; set; }
        public int CorrectCount { get; set; }
        public string ExamType { get; set; }


    }
    public class SubjectiveQuestionAnswerModel : SubjectiveExamModel
    {

        public int SubjectiveQue_ID { get; set; }
        public string SubjectiveQue { get; set; }
        public int SubjectiveAns_ID { get; set; }
        public string SubjectiveAns { get; set; }
        public string SubQuestionCollection { get; set; }
        public string SubAnswerCollection { get; set; }
        public string MarksCollection { get; set; }



    }




}
