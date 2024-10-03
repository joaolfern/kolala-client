import { useFocusEffect } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Header from '@/components/Header/Header'
import SafeAreaView from '@/components/SafeAreaView/SafeAreaView'
import Colors from '@/constants/Colors'
import type { IReport } from '@/Models/Report'
import Report from '@/Models/Report'
import { showToast } from '@/utils/toast'
import ReportCard from './components/ReportCard'

function ReportList() {
  const [reports, setReports] = useState<IReport.Model[]>([])

  const getReports = useCallback(async () => {
    try {
      const response = await Report.list()
      const { data } = response.data || {}
      if (Array.isArray(data)) setReports(data)
    } catch (err: any) {
      console.log(err)
      if (err.message) showToast(err.message)
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      getReports()
    }, [])
  )

  return (
    <FlatList
      ListHeaderComponent={
        <SafeAreaView style={styles.Header}>
          <Header>
            <Header.Title>Minhas denúncias</Header.Title>
          </Header>
        </SafeAreaView>
      }
      style={styles.List}
      data={reports}
      renderItem={({ item, index }) => {
        return (
          <ReportCard
            style={[index === reports.length - 1 ? styles.MarginBottom : []]}
            report={item}
            reloadList={getReports}
          />
        )
      }}
    />
  )
}

export default ReportList

const styles = StyleSheet.create({
  Header: {
    paddingBottom: 0,
  },
  List: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.background,
    padding: 16,
    paddingTop: 24,
  },
  MarginBottom: {
    marginBottom: 44,
  },
})
