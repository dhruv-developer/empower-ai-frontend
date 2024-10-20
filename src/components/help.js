import { useState, useEffect } from 'react';
import axios from '@axios';
import { useRouter } from 'next/router'
import PersonSection from './Persons/Persons';
import TrinityHeader from '@components/UI/TrinityHeader/TrinityHeader';
import Spinner from '@components/UI/Spinner/Spinner';
import Piechart from '../Piechart';
import { programType } from '../../../constants';

import styles from './AllVideos.module.scss';

const levelText = [
  [
    'BASIC UPSKILLING',
    'Stage 1 focuses on building essential business foundations - with exclusive access to MBA in 10 minutes, Consulting/PM/Policy style CV Prep and Case Interview Frameowkr series by Ex BCG Consultant. At each stage, you are expected to not just listen. But pause at relevant stages, solve and then listen to enhance your learning.'
  ],
  [
    'INTERMEDIATE UPSKILLING',
    'Stage 2 focusses on building problem-solving abilities with exclusive access to the Trinity Learning Experience - with Mckinsey and BCG Partners and CEO.At each stage, you are expected to not just listen. But pause at relevant stages, solve and then listen to enhance your learning.'
  ],
  [
    'ADVANCED UPSKILLING',
    'Stage 3 focuses on advanced problem solving with meta ideas and cases with business leaders in corporates and society. At each stage, you are expected to not just listen. But pause at relevant stages, solve and then listen to enhance your learning.'
  ]
];

const AllVideos = (props) => {
  const [content, setContent] = useState();
  const router = useRouter();
  const [stats, setStats] = useState();
  const [totalProgress, setTotalProgress] = useState(0);
  
  const pt = programType[content && content.programType || 1];

  const logout = async () => {
    try {
      await axios.get(`/v1/users/logout`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (err) {
      // console.log(err.response);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await axios.get(`/v1/contents`, {
          withCredentials: true,
        });
        // console.log(data);
         try {

          const code = 18;
          const { data: statsData } = await axios.get(
            `/v1/contents/watch/${code}`,
            {
              withCredentials: true
            }
          );
          
          setTotalProgress(statsData.totalprog);
          
        } catch (error) {
          console.log(error.response);
        }
        let sortedData;

        if (data.programType === 1) {
          const customOrder = [
            'MBA IN 10 MINUTES, CASE INTERVIEWS & CV PREP',
            'CODING FOR CEOS',
            'PYTHON & CHATGPT',
            'MANAGEMENT CONSULTING',
            'POLICY CONSULTING',
            'PRODUCT MANAGEMENT',
            'Decision Making',
            'MANAGEMENT LEADERSHIP',
          ];
  
          // Sort by custom order for programType 1
          sortedData = data.data.sort((a, b) => {
            const indexA = customOrder.indexOf(a._id);
            const indexB = customOrder.indexOf(b._id);
            return indexA - indexB;
          });
        } else if (data.programType === 4) {
          // Sort by level for programType 4
          const customOrder = [
            'CODING FOR CEOS',
            'PYTHON & CHATGPT',
            'SYSTEM DESIGN',
            'CV and Tech Interviews preparation',
            'Some Motivation for You by Global Tech Initiative Founder',
            'Statistics for AI and Data Science',
            'PRODUCT MANAGEMENT',
            'Data Structures and Algorithms (I)',
            'ARTIFICIAL INTELLIGENCE',
            'Data Structures and Algorithms (II)',
          ];
          sortedData = data.data.sort((a, b) => {
            const indexA = customOrder.indexOf(a._id);
            const indexB = customOrder.indexOf(b._id);
            return indexA - indexB;
        });
          // sortedData = data.data.sort((a, b) => {
          //   const levelA = a.content[0]?.level || 0;
          //   const levelB = b.content[0]?.level || 0;
          //   return levelA - levelB;
          // });
        } 
        else if (data.programType === 5) {
          // Show all videos of programType 1 and 4
          const customOrder = [
            'MBA IN 10 MINUTES, CASE INTERVIEWS & CV PREP',
            'CODING FOR CEOS',
            'PYTHON & CHATGPT',
            'POLICY CONSULTING',
            'Statistics for AI and Data Science',
            'MANAGEMENT CONSULTING',
            'Data Structures and Algorithms (I)',
            'PRODUCT MANAGEMENT',
            'Decision Making',
            'Data Structures and Algorithms (II)',
            'CV and Tech Interviews preparation'
          ];

          // Sort by custom order for programType 1
          sortedData = data.data.sort((a, b) => {
            const indexA = customOrder.indexOf(a._id);
            const indexB = customOrder.indexOf(b._id);
            return indexA - indexB;
        });
      }
        
        else {
          // Default sorting (could be adjusted as needed)
          sortedData = data.data;
        }
  
        const sortedResponse = {
          ...data,
          data: sortedData,
        };
  
        setContent(sortedResponse);
      } catch (error) {
        console.log(error.response);
      }
    };
    getData();
  }, []);

  const LevelInfo = ({ level }) => <>
    <div className={styles.user_level}>
      Your Level:{' '}
      <b>{String.fromCharCode(64 + level)}</b>
    </div>
    <div className={`${styles.level_info} ${styles.level_text}`}>
      { levelText[level - 1][0] }
    </div>
    {pt !== 'ALT IIT' && pt !=='GGI Tech' ? 
      <div className={`${styles.level_info}`}>
        { levelText[level - 1][1] }
      </div> : 
       <div className={`${styles.level_info}`}>
        { 'At each stage, you are expected to not just listen. But pause at relevant stages, solve and then listen to enhance your learning.' }
      </div>
    }
    
    <div className={styles.level_info}>
      Watch more modules to increase your level.
    </div>
  </>;

  return (
    <div className={`container ${styles.allVideos}`}>
      <TrinityHeader programType={pt} titleFontSize='5rem' width='33rem' spanFontSize='1.3rem' />
      <div style={{ position: 'absolute', top: 0, right: 0 }}>
  <button className={styles.logoutbtn} onClick={logout}>Logout</button>
  <div style={{ position: 'relative', width: '300px', height: '300px', marginTop: '50px',marginRight: '-75px' }}>
     <Piechart totalProgress={totalProgress} progType={pt} /> 
  </div>
</div>
      <p className={styles.allVideos__para}>
        {
          pt === 'ALT IIT'
          ? <>
            Pursue South Asia's No. 1 Alternative to MS and Advanced Tech Program
            and get to learn & interact with top tech leaders.
            <br></br>
            <br></br>
            {
              content && content.userLevel ?
                <LevelInfo level={content.userLevel && (
                  (content.userLevel < 4 && content.userLevel > 0)
                  ? content.userLevel
                  : content.userLevel > 3 ? 3
                  : 1
                ) || 1} />
              : ''
            }
          </>
          : <>
            To pursue South Asia's No. 1 alternative MBA and get to learn & interact
            with top industry leaders, apply for{' '}
            <a
              href='https://docs.google.com/forms/d/e/1FAIpQLSdSIXPt5AVEAY0bkYpIwfTP3lSDS_HYcDP2-XoYyHba8R4YzA/viewform'
              target='_blank'
              rel='noopener noreferrer'
              style={{ textDecoration: 'underline' }}
            >
              GGI Impact Scholar Program
            </a>
            <br/>
            <br/>
            {
              content && content.userLevel ?
                <LevelInfo level={content.userLevel && (
                  (content.userLevel < 4 && content.userLevel > 0)
                  ? content.userLevel
                  : content.userLevel > 3 ? 3
                  : 1
                ) || 1} />
              : ''
            }
          </>
        }
      </p>
      {content && content.data ? (
        content.data.map((item, index) => (
          <PersonSection userLevel={content.userLevel} title={item._id} content={item.content} programType={content.programType} key={index} />
        ))
      ) : (
        <Spinner center />
      )}
      
      <p className={styles.quoteBox__paras}>
      {
        content && content.userLevel ?
          <LevelInfo level={content.userLevel} />
        : ''
      }
      <br/>
        
        We are constantly improving Trinity by GGI for you. We look forward to receiving your valuable anonymous feedback- 
       <a
          href='https://forms.gle/C8B3FHBJ4FAkCUTw5'
          target='_blank'
          rel='noopener noreferrer'
          style={{ textDecoration: 'underline' }}
        >
           here
        </a>

         </p>
       <div className={styles.quoteBox}>
       {
        pt !== 'ALT IIT'
        ? <>
          <h3 className={styles.quoteBox__ending}>
            <span className={styles.quoteBox__ending_span}></span> Recent Updates on Trinity
          </h3>
          <p className={styles.quoteBox__para}>
            <li>2024/04/01- Quiz section added at the end of each module</li>
            <li>2024/01/01- Pie Chart added to monitor overall progress</li>
            <li>2023/11/01- Checkbox added to track video completion status</li>
            <li>2023/09/01- Peter Fisher videos added</li>
            <li>2023/09/30- Ashutosh's videos added</li>
            <li>2023/09/25- Achal's DSA-2 added</li>
            <li>2023/09/20- Achal's DSA-1 added</li>
            <li>2023/09/13- Nikhil's DSA-1 added</li>            
            <li>2023/07/20- Motivation by Founder added</li>
            <li>2023/07/16- Nikhil's videos content added</li>
            <li>2023/07/04- GTI content added</li>
            <li>2023/06/28- Toshan's content added</li>
            <li>2023/06/15- Product Management module added</li>
            <li>2023/05/15- Leveling system, Management Leadership module added</li>

            <li>2022/07/12- Shatakshi Sharma's Management Consulting CV Prep Trinity added</li>

            <li>2022/06/17- Speed Feature at 1.5X, 2X added for your faster learning</li>

            <li>2022/06/07- Shatakshi Sharma's Consulting Case Interview Trinity added</li>
            <li>2022/06/07- Shatakshi Sharma Management Case Interviews Videos Added</li>
            <li>2022/05/20- Suresh Subudhi's (BCG Managing Director) Trinity added</li>
            <li>2022/04/21- Arun Maira's (Former BCG India Chairmen) Trinity added</li>


            
          </p>
        </>
        : ''
       }
          
        </div>
    </div>
  );
};

export default AllVideos;