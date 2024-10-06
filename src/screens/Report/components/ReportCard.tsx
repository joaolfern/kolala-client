import dayjs from 'dayjs'
import type { ViewProps } from 'react-native'
import { StyleSheet } from 'react-native'

import Avatar from '@/components/Avatar/Avatar'
import Span from '@/components/Span/Span'
import Text from '@/components/Text/Text'
import Colors from '@/constants/Colors'
import type { IReportModel } from '@/Models/Report'
import {
  REPORT_CATEGORY_RESOURCE,
  REPORT_STATUS_COLOR_RESOURCE,
  REPORT_STATUS_RESOURCE,
} from '../constants'
import ReportCardAdminWrapper from './ReportCardAdminWrapper'

interface IProps extends ViewProps {
  report: IReportModel
  reloadList(): void
}

function ReportCard({ report, style, reloadList, ...rest }: IProps) {
  return (
    <ReportCardAdminWrapper reloadList={reloadList} report={report}>
      <Span style={[styles.Card, style]} {...rest}>
        <Span style={styles.Header}>
          <Avatar
            source={
              report.target.picture ? { uri: report.target.picture } : undefined
            }
          />
          <Span style={styles.Title}>
            <Text style={styles.TitleText}>{report.target.name}</Text>
            <Text
              style={{
                color:
                  REPORT_STATUS_COLOR_RESOURCE[
                    report.status as keyof typeof REPORT_STATUS_COLOR_RESOURCE
                  ],
              }}
            >
              {
                REPORT_STATUS_RESOURCE.find(
                  (item) => item.value === report.status
                )?.label
              }
            </Text>
          </Span>
        </Span>
        <Text style={[styles.TitleText, styles.MarginTop]}>
          {
            REPORT_CATEGORY_RESOURCE.find(
              (item) => item.value === report.category
            )?.label
          }
        </Text>
        <Text>{report.description}</Text>
        <Text style={styles.Timestamp}>
          {dayjs(report.createdAt).format('HH:mm DD [de] MMM[.]')}
        </Text>
      </Span>
    </ReportCardAdminWrapper>
  )
}

export default ReportCard

const styles = StyleSheet.create({
  Card: {
    backgroundColor: Colors.xLightBackground,
    marginBottom: 16,
    borderRadius: 20,
    padding: 16,
  },
  Header: {
    flexDirection: 'row',
  },
  Title: {
    marginLeft: 16,
  },
  TitleText: {
    fontWeight: 'bold',
  },
  Timestamp: {
    fontSize: 14,
    marginTop: 4,
    marginLeft: 'auto',
    color: Colors.gray,
  },
  MarginTop: {
    marginTop: 14,
  },
})
