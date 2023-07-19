import {
  ListItem,
  Image,
  DescriptionContainer,
  NameHeading,
  Description,
} from './styledComponents'

const TravelGuideItem = props => {
  const {guideDetails} = props
  const {description, imageUrl, name} = guideDetails

  return (
    <ListItem>
      <Image src={imageUrl} alt={name} />
      <DescriptionContainer>
        <NameHeading>{name}</NameHeading>
        <Description>{description}</Description>
      </DescriptionContainer>
    </ListItem>
  )
}

export default TravelGuideItem
