import React from 'react';

import BurdenAreaGraph from './BurdenAreaGraph';

import { useQuery } from 'react-query';
import { getJournalHistory } from '../../../../../services';

import { DateTime } from 'luxon';

//TODO
//Smooth graph by switching to continuous scaling along the x axis instead of discrete
//so we can a point for each journal entry
const generateData = (journalData, dateRange) => {
  //Setup to perform a loop for each day in the date range
  //DateRange is a start date and an end date, both dateTime objects
  //We want to loop through each day in the date range

  let start = dateRange.from;
  let end = dateRange.to;

  //if start or end are a dateTime, convert to JSDate
  if (typeof start === 'object') start = start.toJSDate();
  if (typeof end === 'object') end = end.toJSDate();

  let currDate = new Date(start.getTime());

  //The end date should be today if end date is in the future
  let endDate = end;
  if (end > new Date()) {
    endDate = new Date();
  }

  const dateLabels = [];
  let symptomsByDate = {};
  //Create the array of dates
  while (currDate <= endDate) {
    //Record dd/MM/YYYY - day and month need to be 04 not 4
    const day = currDate.getDate();
    const dayString = day < 10 ? '0' + day : day;
    const month = currDate.getMonth() + 1;
    const monthString = month < 10 ? '0' + month : month;
    const date = dayString + '/' + monthString + '/' + currDate.getFullYear();

    dateLabels.push(date);
    symptomsByDate[date] = [];
    //Increment by a day
    currDate.setDate(currDate.getDate() + 1);
  }

  const allSymptoms = [];

  //Create an array of symptoms for each day
  for (let i = 0; i < journalData?.length; i++) {
    const journalEntry = journalData[i];

    //I want journalEntry.createdAt format dd/mm/YYYY
    const createdAt = DateTime.fromISO(journalEntry.createdAt);
    // const createdAtString = createdAt.toFormat('dd/MM');
    const createdAtString = createdAt.toFormat('dd/MM/yyyy');

    //Symptoms where classification type is symptom
    // journalEntry.classifications is a list of objects {classificationID, type}
    //we want a list of classificationIDs where type is symptom
    const symptoms = journalEntry.classifications
      .filter((classification) => classification.type === 'symptom')
      .map((classification) => classification.classification);

    //push all new symptoms into allSymptoms
    symptoms.forEach((symptom) => {
      if (!allSymptoms.includes(symptom)) {
        allSymptoms.push(symptom);
      }
    });

    //push and flatten symptoms into dates
    if (!symptomsByDate[createdAtString]) {
      symptomsByDate[createdAtString] = [];
    }

    if (symptoms?.length === 0) {
      symptoms.push('none');
    }
    symptomsByDate[createdAtString].push(...symptoms);
  }

  //Datasets is an array of whether the patient had the symptom on that day
  // [{burden:"fatigue", data:[0,1,1,1,1,0,1] color:"red"}]
  //We assume the patient has the symptom until they create a journal without the symptom

  //initialise dataSets with all symptoms in
  const dataSets = [];
  allSymptoms.forEach((symptom) => {
    if (symptom === 'none') {
      return;
    }
    dataSets.push({ burden: symptom, data: [], color: 'red' });
  });

  let currSymptoms = [];
  for (let i = 0; i < dateLabels?.length; i++) {
    const date = dateLabels[i];
    //If length is 0, there was no journal, so we assume they had all the currSymptoms
    //We only update if theres a journal
    if (symptomsByDate[date]?.length > 0) {
      //
      if (
        symptomsByDate[date]?.includes('none') &&
        symptomsByDate[date]?.length === 1
      ) {
        currSymptoms = [];
      } else {
        currSymptoms = symptomsByDate[date];
      }
    }

    //For each symptom, if the patient had it, push 1, else push 0
    dataSets.forEach((dataSet) => {
      if (currSymptoms.includes(dataSet.burden)) {
        dataSet.data.push(1);
      } else {
        dataSet.data.push(0);
      }
    });
  }
  return { dataSets: dataSets, labels: dateLabels };
};

export default function SymptomBurdenGraphic({
  dateRange,
  detailed = false,
  symptom
}) {
  //e.g.
  //rawData [{burden:"fatigue", data:[0,1,1,1,1,0,1] color:"red"}]
  // const labels = ['', '', '', 'Treatment', '', '', ''];

  if (!dateRange) {
    return null;
  }

  const { data: rawData, isLoading } = useQuery(
    ['journal-entries', dateRange],
    () => getJournalHistory(dateRange)
  );
  if (isLoading) return null;
  const journalData = rawData?.data.journalEntries;
  const data = generateData(journalData, dateRange);
  // console.log(data);
  //Each day in the date range
  // const labels = [];
  // for (let i = 0; i < dateRange; i++) {
  //   labels.push('');
  // }

  // const dummyLabels = ['', '', '', 'Treatment', '', '', ''];

  // const dummyData = [
  //   { burden: 'cough', data: [0, 1, 1, 1, 1, 0, 1], color: 'red' },
  //   { burden: 'fatigue', data: [0, 0, 1, 1, 1, 1, 1], color: 'blue' },
  //   { burden: 'vomiting', data: [0, 1, 1, 1, 0, 0, 0], color: 'green' }
  // ];

  if (!dateRange.from || !dateRange.to) {
    return null;
  }

  //Only the first and last label, all the rest should be ''
  const labels = [];
  for (let i = 0; i < data?.labels?.length; i++) {
    // if (i === 0 || i === data.labels.length - 1) {
    //   labels.push(data.labels[i]);
    // } else {
    labels.push('');
    // }
  }
  return (
    <BurdenAreaGraph
      detailed={detailed}
      symptom={symptom}
      rawData={data.dataSets}
      labels={labels}
      displayYAxis={false}
      color={'blue'}
    />
  );
}
