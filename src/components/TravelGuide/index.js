import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TravelGuideItem from '../TravelGuideItem'

import {
  AppContainer,
  TravelGuideHeading,
  Container,
  TravelGuideListContainer,
  LoaderContainer,
} from './styledComponents'

const statusList = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class TravelGuide extends Component {
  state = {
    travelGuideList: [],
    status: statusList.initial,
  }

  componentDidMount() {
    this.travelGuidePackagesApiUrl()
  }

  travelGuidePackagesApiUrl = async () => {
    this.setState({status: statusList.loading})
    const url = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.packages.map(each => ({
      description: each.description,
      id: each.id,
      imageUrl: each.image_url,
      name: each.name,
    }))

    this.setState({travelGuideList: updatedData, status: statusList.success})
  }

  loaderSpinner = () => (
    <LoaderContainer>
      <div data-testid="loader">
        <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
      </div>
    </LoaderContainer>
  )

  succesView = () => {
    const {travelGuideList} = this.state
    return (
      <TravelGuideListContainer>
        {travelGuideList.map(each => (
          <TravelGuideItem key={each.id} guideDetails={each} />
        ))}
      </TravelGuideListContainer>
    )
  }

  getStatus = () => {
    const {status} = this.state
    switch (status) {
      case statusList.loading:
        return this.loaderSpinner()
      case statusList.success:
        return this.succesView()
      default:
        return null
    }
  }

  render() {
    return (
      <AppContainer>
        <Container>
          <TravelGuideHeading>Travel Guide</TravelGuideHeading>
        </Container>
        {this.getStatus()}
      </AppContainer>
    )
  }
}
export default TravelGuide
