import axios from 'axios';
import _ from 'lodash';

if (
  process.env.REACT_APP_ENVIRONMENT === 'dev' ||
  process.env.REACT_APP_ENVIRONMENT === 'local'
) {
  axios.defaults.baseURL = 'https://api.dev.abbyhealth.app/';
} else {
  axios.defaults.baseURL = 'https://api.abbyhealth.app/';
}

let s3url =
  'https://s3.ap-southeast-2.amazonaws.com/insights-source-of-truth.prod/';
if (
  process.env.REACT_APP_ENVIRONMENT === 'dev' ||
  process.env.REACT_APP_ENVIRONMENT === 'local'
) {
  s3url =
    'https://s3.ap-southeast-2.amazonaws.com/insights-source-of-truth.dev/';
}

let selfCareUrl = 'https://s3.ap-southeast-2.amazonaws.com/self-care.prod/';
if (
  process.env.REACT_APP_ENVIRONMENT === 'dev' ||
  process.env.REACT_APP_ENVIRONMENT === 'local'
) {
  selfCareUrl = 'https://s3.ap-southeast-2.amazonaws.com/self-care.dev/';
}

// axios.defaults.baseURL = 'http://159.223.78.206:8081'; //The Bulldozer
// axios.defaults.baseURL = 'http://134.209.96.100:8081'; //The Powerlifter
axios.defaults.baseURL = 'http://localhost:8080'; // Local

const performGetRequest = async (url, params = {}) => {
  const response = axios.get(url, {
    headers: {
      // Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
      Authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlJKVENGektENEVwZTFhT1NvT3lmNiJ9.eyJpc3MiOiJodHRwczovL2FiYnloZWFsdGgtbG9jYWwuYXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYyYmU3M2ViNTQ1YmY1ZDUzYTMzNzMwYyIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJodHRwczovL2FiYnloZWFsdGgtbG9jYWwuYXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTY4NDQ2MDI5NCwiZXhwIjoxNjg0NTQ2Njk0LCJhenAiOiIwdk9MUGRhd21nWmRVQ0tiUU5RRHhwSkZ6NlVxTE1SaSIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwifQ.fT632yXxWEAIAEcvD-LHAz8IteJ-pJ41qxpg6gJozEoeGaWhT32zlEumpDrRjUZOAgRXq2iyfZWSEr--8ON86vneW8CP1flsgHPO9gigBt_TOyiulnZgHdP__sjMvsa5uv6guYje6ARflZTa-7bVN_qf9uqgRUCDbRupkLib9SmE0Nh6wNLeHkpcYd30VqqTSN-VipuA3w3lsB6ys8gtemfamfZYoxnFWZ6_HFy0mZs9gL-7yKByVlHtElYiF5m3UokIRbhKBS1_Py3D7PwPadFvXvAD2wqRpDzwVsO-ISUfLUSUmkzbegZP5TK2ZDJ3Q-Ro3bfBdqXPq0y1GmhK4w`
    },
    params: {
      // sessionID: window.sessionStorage.getItem('sessionID'),
      ...params
    }
  });
  return response;
};

const performPostRequest = async (url, params = {}) => {
  return axios.post(
    url,
    {
      sessionID: window.sessionStorage.getItem('sessionID'),
      ...params
    },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
      }
    }
  );
};

const performPutRequest = async (url, params = {}) => {
  return axios.put(
    url,
    {
      sessionID: window.sessionStorage.getItem('sessionID'),
      ...params
    },
    {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
      }
    }
  );
};

const performDeleteRequest = async (url, params = {}) => {
  return axios.delete(url, {
    headers: {
      Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
    },
    data: {
      sessionID: window.sessionStorage.getItem('sessionID'),
      ...params
    }
  });
};

export const getJournalPackages = (journalId) =>
  performGetRequest('journal/packages', {
    journal_id: journalId
  });

export const getPackageDetails = (packageName, journalId) =>
  performGetRequest('package/details', {
    package: packageName,
    journal_id: journalId
  });

export const getNextQuestionForPackage = (packageId, journalId) =>
  performGetRequest('/package/next-question', {
    package_id: packageId,
    journal_id: journalId
  });

export const getNextQuestionFromMultiAnswers = (
  answers,
  journalId,
  packageId
) =>
  performGetRequest('question/fromAnswers', {
    answers: JSON.stringify(answers),
    journal_id: journalId,
    package_id: packageId
  });

export const getSignificantFindings = (journalId) =>
  performGetRequest('journal/significant-findings', {
    journal_id: journalId
  });

export const getSignificantFindingsForUser = (dateRange) =>
  performGetRequest('user/significant-findings', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const classify = (jid) =>
  performGetRequest('classify', { journal_id: jid });

export const extract = (text) =>
  performGetRequest('entity_extraction', { text });

export const createJournalEntry = (journal_text, html_formatted_text) => {
  return performPostRequest('journal/create', {
    journal_text,
    html_formatted_text
  });
};

export const updateJournalEntry = (journal_text, jid, html_formatted_text) => {
  return performPutRequest('journal/update', {
    journal_text,
    journal_id: jid,
    html_formatted_text
  });
};

export const updateSymptomSummary = (summary, package_id) => {
  return performPutRequest('package/symptom-summary/update', {
    package_id,
    summary
  });
};

export const finishNLP = (jid) => {
  return performPostRequest('journal/finish_nlp', {
    journal_id: jid
  });
};

export const submitAnswersForPackage = (
  journalId,
  packageId,
  chosenAnswers
) => {
  return performPutRequest('package/submit-answers', {
    journal_id: journalId,
    package_id: packageId,
    answers: JSON.stringify(chosenAnswers)
  });
};

// export const onBoardUser = (name, emailFrequency) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve({ data: 'success' }), 5000);
//   });
// };

// export const onBoardUser = (name, emailFrequency) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve({ data: 'success' }), 5000);
//   });
// };

export const getTriageForJournal = (journalId) =>
  performGetRequest('journal/triage', {
    journal_id: journalId
  });

export const generateSummary = async (jid) =>
  performPostRequest('summary/one_sentence', { journal_id: jid });

export const getSymptomSummary = async (jid, symptom) =>
  await performGetRequest('summary/symptom', {
    journal_id: jid,
    issue_code: symptom
  });

export const classifyMedication = async (jid) =>
  performPostRequest('classify/medications', { journal_id: jid });
export const classifyADLs = async (jid) =>
  performPostRequest('classify/adl', { journal_id: jid });

export const classifyReligious = async (jid) =>
  performGetRequest('classify/religious', { journal_id: jid });

export const classifyEconomic = async (jid) =>
  performGetRequest('classify/economic', { journal_id: jid });

export const classifySocial = async (jid) =>
  performGetRequest('classify/social', { journal_id: jid });

export const classifyMentalHealth = async (jid) =>
  performGetRequest('classify/mental_health', { journal_id: jid });

export const getAllSymptoms = async () => {
  return axios.get(s3url + 'symptoms.json');
};

export const getAllAdls = async () => {
  return axios.get(s3url + 'adlInsights.json');
};

export const getSelfCareInfo = async () => {
  const selfCareInfo = (await axios.get(selfCareUrl + 'self_care.json')).data;
  return selfCareInfo;
};

export const getAllInsights = async () => {
  let insights = [];

  const adlInsights = (await axios.get(s3url + 'adlInsights.json')).data;
  const economicInsights = (await axios.get(s3url + 'economicInsights.json'))
    .data;
  const medicationInsights = (
    await axios.get(s3url + 'medicationInsights.json')
  ).data;
  const religiousInsights = (await axios.get(s3url + 'religiousInsights.json'))
    .data;
  const socialInsights = (await axios.get(s3url + 'socialInsights.json')).data;
  const symptoms = (await axios.get(s3url + 'symptoms.json')).data;

  insights = _.concat(
    adlInsights.map((i) => ({
      ...i,
      type: 'adl'
    })),
    economicInsights.map((i) => ({
      ...i,
      type: 'economic'
    })),
    medicationInsights.map((i) => ({
      ...i,
      type: 'medication'
    })),
    religiousInsights.map((i) => ({
      ...i,
      type: 'religious'
    })),
    socialInsights.map((i) => ({
      ...i,
      type: 'social'
    })),
    symptoms.map((i) => ({
      ...i,
      type: 'symptom'
    }))
  );

  return insights;
};

export const getJournalHistory = async (dateRange) =>
  performGetRequest('user/journals', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const getFeed = async (dateRange) => {
  return performGetRequest('user/feed', {
    from: dateRange.from,
    to: dateRange.to
  });
};

export const getDailyJournals = async (dateRange) =>
  performGetRequest('user/daily-journals', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const getJournalsByInsight = async () => {
  return performGetRequest('user/get_journals_by_insight');
};

export const getJournalsByInsightWithMonth = async (month) => {
  return performGetRequest('user/get_journals_by_insight', {
    month: month.toLowerCase()
  });
};

export const getJournalsByFindingWithMonth = async (month) => {
  return performGetRequest('user/get_journals_by_finding', {
    month: month.toLowerCase()
  });
};

export const getJournalDetails = async (journalId) =>
  performGetRequest('journal/details', { journal_id: journalId });

export const resetPassword = async () =>
  performPostRequest('user/reset-password', {});

export const deleteUser = async () => performDeleteRequest('user/delete', {});

export const deleteJournalForId = async (journalId) => {
  return performDeleteRequest(`journal/${journalId}`, {});
};

export const goBackOneQuestion = (journalId, packageId) =>
  performPutRequest('package/back-one', {
    journal_id: journalId,
    package_id: packageId
  });

export const sendQuestionFeedback = (rawInput, questionId, journalId) =>
  performPostRequest('website-feedback/question', {
    question_id: questionId,
    rawInput: rawInput,
    journal_id: journalId
  });

export const sendFeatureFeedback = (
  featureName,
  affectedEntityID,
  rawContent,
  positive,
  feedback
) =>
  performPostRequest('website-feedback/feature', {
    featureName: featureName,
    affectedEntityID: affectedEntityID,
    rawContent: rawContent,
    positive: positive,
    feedback: feedback
  });

export const completeJournalInvestigation = (journalId) =>
  performPostRequest('journal/complete', {
    journal_id: journalId
  });

export const updateUserData = ({
  name,
  onBoarded,
  extraData,
  emailFrequency
}) => {
  const paramsObj = {};
  if (name) paramsObj.name = name;
  if (onBoarded) paramsObj.onboarded = onBoarded;
  if (extraData) paramsObj.extra_data = extraData;
  if (emailFrequency) paramsObj.email_frequency = emailFrequency;
  return performPutRequest('user/update', paramsObj);
};

export const onboardUser = () => performPostRequest('user/onboard');

// OLD!
// export const generateDoctorReport = (jid) =>
//   performPostRequest('summary/doctor_summary', { journal_id: jid });

export const confirmInsights = (journalID, insights) =>
  performPutRequest('model-feedback/confirmed', {
    insights: JSON.stringify(insights),
    journal_id: journalID
  });

export const getSelfCareContentForSymptom = (symptom) =>
  performGetRequest('self-care', {
    symptom
  });

export const getSymptomIssuesForUser = (dateRange) => {
  return performGetRequest('user/issue/list/symptoms', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getAdlIssuesForUser = (dateRange) => {
  return performGetRequest('user/issue/list/adl', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getWeeklyProgress = (dateRange) =>
  performGetRequest('user/weekly-progress', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const getIssueSummaryForUser = (dateRange, from_dashboard = false) => {
  return performGetRequest('user/issue/list/summary', {
    from: dateRange?.from,
    to: dateRange?.to,
    from_dashboard
  });
};

export const getDirectiveForUser = (dateRange) => {
  return performGetRequest('user/issue/triage', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getIssueForId = (issue_id, dateRange) => {
  return performGetRequest('user/issue/detail', {
    issue_id,
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getIssueSummary = (issue_id) => {
  return performGetRequest('user/issue/summarise', {
    issue_id
  });
};

export const getPackageTriage = (package_id) => {
  return performGetRequest('package/triage', {
    package_id
  });
};

export const getInsightsForUser = (dateRange) => {
  return performGetRequest('user/insights', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getJournalPrompts = () => {
  return performGetRequest('customText/journal-prompts', {});
};

export const getIssueTrend = (issueId, dateRange) => {
  return performGetRequest('user/issue/trend', {
    issue_id: issueId,
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const addressIssue = (addressed, issue_id) => {
  return performPostRequest('user/issue/address', {
    addressed,
    issue_id
  });
};

export const getAllDoctors = () => performGetRequest('doctors/');

export const deleteAppointment = (appointmentId) =>
  performDeleteRequest(`user/appointment/${appointmentId}`);

export const getAppointment = (appointmentId) =>
  performGetRequest('user/appointment', { appointmentId });

export const getDataLastViewedAt = (data_key) =>
  performGetRequest('user/fetch-log', { data_key });

export const markDataAsViewed = (data_key) =>
  performPutRequest('user/fetch-log', { data_key });

export const createAppointment = (props) =>
  performPostRequest('user/appointment', props);

export const updateAppointment = (props) =>
  performPutRequest('user/appointment', props);

export const completePackage = (pid, jid) => {
  return performPostRequest('package/complete', {
    journal_id: jid,
    package_id: pid
  });
};

export const deleteClassification = (journal_id, insight_id) => {
  return performDeleteRequest(
    `journal/insight/${journal_id}/${insight_id}`,
    {}
  );
};

export const getNotifications = () => {
  return performGetRequest('user/notifications');
};

export const markNotificationNotified = (notification_id) => {
  return performPostRequest('user/notifications/mark_as', {
    id: notification_id,
    notified: true
  });
};

export const markNotificationActioned = (notification_id) => {
  return performPostRequest('user/notifications/mark_as', {
    id: notification_id,
    actioned: true
  });
};

export const markNotificationSeen = (notification_id) => {
  return performPostRequest('user/notifications/mark_as', {
    id: notification_id,
    seen: true
  });
};

export const getAssociationInsight = (dateRange) =>
  performGetRequest('user/insight/association', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const getSymptomTip = (dateRange) =>
  performGetRequest('user/symptom_tip', {
    from: dateRange?.from,
    to: dateRange?.to
  });

export const getUser = () => performGetRequest('user');
export const getUserDoctors = () => performGetRequest('user/doctor/all');
export const addDoctorForUser = (doctorId) =>
  performPutRequest('user/doctor/edit', { doctorId });
export const createDoctorForUser = (doctorName, doctorEmail) =>
  performPostRequest('user/doctor/add', { doctorName, doctorEmail });

export const getUserAppointments = () =>
  performGetRequest('user/appointment/all');

export const getUserExpectation = () =>
  performGetRequest('user/journal-expectation');

export const getUserChecklist = () =>
  performGetRequest('user/journal-checklist');

export const checkChecklistItem = (item) =>
  performPostRequest('user/journal-checklist/checkItem', { item: item });

export const getTreatmentStages = () =>
  performGetRequest('user/possible-stages');

// =============
// DEPRECATED ||
// =========== =
// export const getReportSummary = (dateRange) => {
//   return performGetRequest('summary/report', {
//     from: dateRange?.from,
//     to: dateRange?.to
//   });
// };

export const getAnalysisSummary = (dateRange) => {
  return performGetRequest('summary/analysis', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getDeepDive = (jid) => {
  return performGetRequest('customText/deepDive', {
    jid: jid
  });
};

export const getReportData = (reportID) => {
  return performGetRequest('report/getReportData', {
    reportID: reportID
  });
};

export const generateReportData = async (dateRange) => {
  return await performPostRequest('report/generateReportData', {
    from: dateRange?.from,
    to: dateRange?.to
  });
};

export const getAllReports = () => {
  return performGetRequest('report/getAllReports');
};

export const getReportDataByURL = (reportURL) => {
  return performGetRequest(`report/getReportData/${reportURL}`);
};

export const markReportShared = (reportURL) =>
  performPostRequest('report/share', {
    reportURL: reportURL
  });

export const sendReportEmail = (doctorID, reportURL) => {
  return performPostRequest(`report/sendReportEmail`, {
    doctorID: doctorID,
    reportURL: reportURL
  });
};

export const setReportSummary = (reportURL, reportSummary) => {
  return performPostRequest(`report/setReportSummary`, {
    reportURL: reportURL,
    reportSummary: reportSummary
  });
};

export const rejectAgendaItem = (rejectedItemText, rejectionReason) =>
  performPostRequest('user/agenda', {
    rejectedItem: rejectedItemText,
    rejectionReason
  });

export const removeRejectedAgendaItem = (rejectedId) =>
  performDeleteRequest(`user/agenda/${rejectedId}`);

export const getRejectedAgendaItems = () =>
  performGetRequest('user/agenda/all');

export const toggleEmail = (enabled) =>
  performPutRequest('user/email', { isEmailEnabled: enabled });
