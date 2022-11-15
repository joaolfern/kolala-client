import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { ReactNode, useCallback } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import Colors from '../../../constants/Colors'
import Report, { IReport } from '../../../Models/Report'
import { useAppSelector } from '../../../store/hooks'
import { selectUser } from '../../../store/userSlice'
import { showToast } from '../../../utils/toast'
import { REPORT_STATUS_RESOURCE } from '../constants'

interface IProps extends TouchableOpacityProps {
  children: ReactNode
  report: IReport.Model
  reloadList(): void
}

function ReportCardAdminWrapper({
  children,
  style,
  report,
  reloadList,
  ...rest
}: IProps) {
  const { showActionSheetWithOptions } = useActionSheet()
  const { user } = useAppSelector(selectUser)
  const { navigate } = useNavigation()

  async function updateReportStatus({
    report,
    status,
  }: {
    report: IReport.Model
    status: number
  }) {
    try {
      await Report.updateReport({
        body: {
          status,
        },
        reportId: report.id,
      })

      reloadList()
    } catch (err: any) {
      if (err?.message) showToast(err.message)
    }
  }

  const isAdmin = user?.level === 'admin'
  const showUpdateReportStatusOptions = useCallback(() => {
    const options = [
      'Pendente',
      'Suspender conta',
      'Descartar denúncia',
      'Visitar perfil',
      'Cancelar',
    ]
    showActionSheetWithOptions(
      {
        options,
        tintColor: Colors.text,
        containerStyle: {
          backgroundColor: Colors.lightBackground,
        },
      },
      (selectedIndex?: number) => {
        if (typeof selectedIndex === 'undefined') return
        const isLast = options.length - 1 === selectedIndex
        if (isLast) return
        const option = options[selectedIndex]

        switch (option) {
          case 'Visitar perfil': {
            navigate('Profile', {
              profileUserId: report.targetId,
            })
          }
        }

        updateReportStatus({ report, status: selectedIndex })
      }
    )
  }, [])

  return (
    <>
      {isAdmin ? (
        <TouchableOpacity
          style={[style]}
          onPress={showUpdateReportStatusOptions}
          {...rest}
        >
          {children}
        </TouchableOpacity>
      ) : (
        children
      )}
    </>
  )
}

export default ReportCardAdminWrapper
