import React from 'react'
import { ExternalLink, PageParagraph, PageTextList, SectionBox } from '../../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import pipelineImg from './pipeline.PNG'

function MachineLearning() {
  return (
    <SectionBox title="Machine Learning" usePageTitle>
      <Box>
        <PageParagraph text="Developer's note: " bold/>
        <PageParagraph text="The following contents were learned in "/>
        <ExternalLink href="https://www.handbook.unsw.edu.au/undergraduate/courses/2024/COMP9417?year=2024">[UNSW 24T1, COMP9417 Machine Learning and Data Mining]</ExternalLink>
        <PageParagraph text=", used images were obtained from lecture slides unless otherwise annotated."/>
      </Box>
      <Box>
        <PageParagraph text='The field of machine learning is concerned with the question of how to construct computer programs that automatically improve from experience. - T. Mitchell in "Machine Learning" (1997). Another more descriptive definition may be that machine learning refers to the '/>
        <PageParagraph text="automated" bold/>
        <PageParagraph text=" detection of "/>
        <PageParagraph text="meaningful patterns" bold/>
        <PageParagraph text=" in data."/>
      </Box>
      <SectionBox title="Machine learning pipeline">
        <PageParagraph text="Conceptually, the process of machine learning follows the pipeline:"/>
        <img src={pipelineImg} alt="machine learning pipeline" width="700rem"/>
        <SectionBox title="1. Data retrieval" titleFs={20}>
          <PageParagraph text='Of course, for the machine to be capable of learning to be better at knowing or doing "something", it needs information about this "something". Hence, the first step is to retrieve relevant data from the database.'/>
          <PageTextList
            listName="What does this mean?"
            list={[
              <Box>
                <PageParagraph bold text="More data = more accurate model (generally): "/>
                <PageParagraph text="The more relevant data the machine receives, the more it can learn about this something, and hence will theoretically produce a more accurate model. However, "/>
                <PageParagraph text=" the provision of large amount of data also increases the likelihood of providing inaccurate, irrelevant or simply put, "/>
                <PageParagraph bold text="bad data. "/>
                <PageParagraph text="In order to filter out these bad data, a critical part of the next step, data preparation, is the cleaning and preprocessing of the data retrieved. "/>
              </Box>,
              <Box>
                <PageParagraph bold text="Collecting sufficient data may be challenging: "/>
                <PageParagraph text="Certain areas of interest may already lack digitised data, if any data at all. Legal issues in gaining access to other sources' databases. Ethical issues in 1. respecting the people's privacy and their freedom of control over how their personal information is distributed and used, and 2. the nature of the machine learning topic may in itself be morally questionable."/>
              </Box>,
            ]}
          />
        </SectionBox>
      </SectionBox>
    </SectionBox>
  )
}

export default MachineLearning