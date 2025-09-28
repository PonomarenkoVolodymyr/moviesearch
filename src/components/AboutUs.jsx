import React from 'react'
import { Card } from 'react-bootstrap'
import '../assets/css/styles.scss'

const AboutUs = () => {
  return (
    <Card className='about-us'>
         <Card.Body className='mb-5'>
            <Card.Title className="fs-1 mb-5 text-center">Movie serch - Your Personal Movie Discovery Guide</Card.Title>
            <Card.Subtitle className="fs-4 mb-3 text-muted">Tired of scrolling endlessly? Movie serch helps you discover your next favorite movie or TV show in seconds. Get smart, personalized recommendations based on your taste and mood, all in one place.</Card.Subtitle>
            <Card.Text className='fs-5'>
            Our story began on a classic movie night, lost in a sea of options. We asked, "Why is it so hard to find something great to watch?" So, we built CineFind. We're a team of film buffs and tech geeks on a mission to connect people with the perfect stories. We believe the right movie is out there for everyone—we just make it easier to find.
            </Card.Text>          
      </Card.Body>     
    </Card>
  )
}

export default AboutUs
