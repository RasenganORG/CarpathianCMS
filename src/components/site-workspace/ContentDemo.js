import { Button, Col, Image, Input, Radio, Row, Space, Typography } from 'antd';
import Toolbar from '../toolbar/Toolbar';

const ContentDemo = () => {

  return (
    <div>
      <Toolbar isEdit={false}/>
      <Space direction={'vertical'} size={30}>
        <Row>
          <Col
            span={12}
            offset={6}>
            <Typography.Title
              level={1}
              style={{
                color: 'darkblue',
              }}>M2 MacBook Air 2022 review</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col
            span={18}
            offset={3}>
            <Typography.Title level={3}>Our new Editor-in-Chief takes you hands-on with Apple's all-new MacBook
              Air.</Typography.Title>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Image
              src={'https://www.imore.com/sites/imore.com/files/styles/large_wm_blw/public/field/image/2022/06/m2-macbook-air-midnight-closed.jpeg'} />
          </Col>
          <Col span={6}>
            <Space size={27} direction={'vertical'}>
              <Typography.Title level={4}>Keep in Touch</Typography.Title>
              <Typography.Title level={5}>Sign up now to get the latest news, deals & more from
                MyGarageNews!</Typography.Title>
              <Input placeholder={'Your email address'} />
              <Typography.Text>I would like to receive news and offers from other MyGarageNews brands.</Typography.Text>
              <Radio.Group name={'choose1'}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>NO</Radio>
              </Radio.Group>
              <Typography.Text>I would like to receive mail from MyGarageNews partners.</Typography.Text>
              <Radio.Group name={'choose1'}>
                <Radio value={1}>Yes</Radio>
                <Radio value={2}>NO</Radio>
              </Radio.Group>
              <Button>
                SIGN ME UP
              </Button>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Typography.Paragraph style={{
              fontSize: '18px',
            }}
            >
              How do you improve upon perfection? For Apple, it's with the brand new
              M2 MacBook Air, which made its debut at this summer's WWDC 2022 event.
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                fontSize: '18px',
              }}
            >

              For more than a decade, the MacBook Air form factor has held steady as
              the ultimate ultraportable laptop, giving rise to a wave of imitators
              and kickstarting the "ultrabook" laptop craze. Light and powerful, it
              pushed the boundaries of what people thought could be achieved from
              such a small package.
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                fontSize: '18px',
              }}
            >

              But, in aesthetic terms at least, the MacBook Air has hardly changed
              since Steve Jobs first removed its super-slim frame from a manila
              envelope all those years ago at Macworld 2008. What wowed in 2008 is
              now the norm even from lesser manufacturers. And, as we've seen during
              our MacBook Pro 13-inch with M2 chip review, Apple has no problem
              with newly-launched hardware retaining awfully familiar external
              designs, when that design has proved successful. If it ain't broke,
              don't fix it – and for years that's been the fate of the MacBook Air.
            </Typography.Paragraph>

            <Typography.Paragraph
              style={{
                fontSize: '18px',
              }}
            >
              Jump from 2008 forward to WWDC 2022, however, and Apple has finally
              seen it fit to fully update the MacBook Air line. Not only does it now
              sport the freshly-unveiled M2 chipset, but it comes in a revised
              (and still super-slim) form factor — as well as a range of new colors.
              Does the new MacBook Air have what it takes to wow the crowds once again?

              We had the M2 MacBook Air in our hands at Apple Park. Here are our
              first impressions ahead of our full 2022 MacBook Air review.
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Typography.Title level={2}>
              Design
            </Typography.Title>
            <Image src={'https://www.imore.com/sites/imore.com/files/styles/large_wm_brb/public/field/image/2022/06/macbook-air-hands-on-3.jpg'}/>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Typography.Paragraph style={{
              fontSize: '18px',
            }}
            >
              Need a lightweight powerhouse? The M2 MacBook Air may have a new
              chassis design, but it's still as light and sleek as ever, with
              Apple retaining the slimline stylings that has made the range so
              popular in the past. Gone is the tapered shell that gave previous
              generations of the Air their razor-sharp profiles; now there is
              a flatter design that more closely resembles the MacBook Pro lineup.
              Measuring just 11.3mm thin, it weighs a mere 2.7 pounds, making it
              just ever so slightly lighter than the most recent model. You'll
              be able to sling this thing in a rucksack and forget it's there —
              and easily balance it with one hand.
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                fontSize: '18px',
              }}
            >
              As previously leaked, there are a few additional color options to
              choose from, but not quite the iMac rainbow that many had hoped for.
              While you don't get greens, yellows and lilac shades as previously
              suggested, you will still have a choice between silver, space grey,
              Midnight, and Starlight colors. And though the options are fewer in
              number than anticipated, they're very attractive in the flesh —
              the Starlight option has a slight, almost iridescent quality as it
              moves in the light, while the Midnight is as close to a black
              laptop as you're likely to see Apple ever make.
            </Typography.Paragraph>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Typography.Title level={2}>
              Verdict
            </Typography.Title>
            <Image src={'https://www.imore.com/sites/imore.com/files/styles/large_wm_blb/public/field/image/2022/06/macbook-air-hands-on-5.jpg'}/>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <Typography.Paragraph style={{
              fontSize: '18px',
            }}
            >
              The inclusion of the new M2 chipset would have been enough to
              lure in those tempted by the MacBook Air's slim frame. But a
              new set of colorful design options and a reimagined chassis will
              make those looking at an entry-level MacBook Pro think hard before
              throwing down their cash.
            </Typography.Paragraph>
            <Typography.Paragraph
              style={{
                fontSize: '18px',
              }}
            >
              We'll need more time to put the M2 through its paces in the Air
              (it's already proved astonishing in the new 13-inch MacBook Pro) —
              and to see if the new design remains as trustworthy a travel
              companion as the last MacBook Air was — but, considering the
              MacBook Air is supposed to be Apple's entry level laptop, it's
              hard to imagine a more impressive first look; even if the price
              hike does make it a bit more difficult to afford.
            </Typography.Paragraph>
          </Col>
        </Row>
      </Space>
    </div>);
};

export default ContentDemo;
