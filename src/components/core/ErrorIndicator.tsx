const errors: Record<number, string> = {
  401: 'Bạn không được phép truy cập trang này. Vui lòng đăng nhập để tiếp tục.',
  404: 'Trang web không thể tìm thấy hoặc không tồn tại.',
  403: 'Bạn không có quyền truy cập vào trang này',
  500: 'Máy chủ đang gặp sự cố, vui lòng thử lại sau.',
  503: 'Máy chủ không thể xử lý yêu cầu của bạn tại thời điểm này. Vui lòng thử lại sau.'
}

interface Props {
  code?: number
  statusText: string
}

const ErrorIndicator = (props: Props) => {
  const { code, statusText } = props

  return (
    <main title={`Error: ${statusText}`}>
      <section className='flex items-center justify-center flex-grow p-12 w-full h-screen flex-col'>
        <p className='items-center text-2xl font-bold'>{code && code in errors ? `${code}: ${statusText}` : 'Lỗi!'}</p>
        <p className='items-center text-lg mt-2'>
          {code && code in errors ? errors[code] : 'Một lỗi không xác định đã xảy ra!'}
        </p>
        <div className='flex justify-center mt-6'>
          <button onClick={() => window.location.replace('/')}>Quay vể trang chủ</button>
        </div>
      </section>
    </main>
  )
}

export default ErrorIndicator
