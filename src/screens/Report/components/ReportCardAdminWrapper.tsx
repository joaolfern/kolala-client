import { useActionSheet } from '@expo/react-native-action-sheet'
import { useNavigation } from '@react-navigation/native'
import type { ReactNode } from 'react'
import { useCallback } from 'react'
import type { TouchableOpacityProps } from 'react-native'
import { TouchableOpacity } from 'react-native'

import Colors from '@/constants/Colors'
import type { IReportModel } from '@/Models/Report'
import Report from '@/Models/Report'
import { useAppSelector } from '@/store/hooks'
import { selectUser } from '@/store/userSlice'
import { showToast } from '@/utils/toast'

interface IProps extends TouchableOpacityProps {
  children: ReactNode
  report: IReportModel
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
    report: IReportModel
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
    } catch (err) {
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
