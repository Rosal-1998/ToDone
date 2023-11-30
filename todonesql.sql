-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.6.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win32
-- HeidiSQL 版本:                  9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 导出 to_done 的数据库结构
CREATE DATABASE IF NOT EXISTS `to_done` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `to_done`;


-- 导出  表 to_done.label 结构
CREATE TABLE IF NOT EXISTS `label` (
  `labelid` int(11) DEFAULT NULL,
  `labelcontent` varchar(50) DEFAULT NULL,
  `labelmasterid` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  to_done.label 的数据：~0 rows (大约)
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
/*!40000 ALTER TABLE `label` ENABLE KEYS */;


-- 导出  表 to_done.task 结构
CREATE TABLE IF NOT EXISTS `task` (
  `taskid` varchar(100) DEFAULT NULL,
  `wxid` varchar(100) DEFAULT NULL,
  `content` varchar(100) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `labelid` int(11) DEFAULT NULL,
  `ddl` int(11) DEFAULT NULL,
  `star` int(11) DEFAULT NULL,
  `labelcontent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  to_done.task 的数据：~6 rows (大约)
/*!40000 ALTER TABLE `task` DISABLE KEYS */;
INSERT INTO `task` (`taskid`, `wxid`, `content`, `state`, `labelid`, `ddl`, `star`, `labelcontent`) VALUES
	('1663671377000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '今天吃蜜雪冰城', 1, NULL, NULL, NULL, NULL),
	('1663671423000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '明天吃益和堂', 1, NULL, NULL, NULL, NULL),
	('1663671432000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '后天吃西北风', 1, NULL, NULL, NULL, NULL),
	('1663671535000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '买水果', 1, NULL, NULL, NULL, NULL),
	('1663671548000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '拿快递', 1, NULL, NULL, NULL, NULL),
	('1670931382000', 'oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '你好', 1, NULL, NULL, NULL, NULL);
/*!40000 ALTER TABLE `task` ENABLE KEYS */;


-- 导出  表 to_done.user 结构
CREATE TABLE IF NOT EXISTS `user` (
  `wxid` varchar(100) DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `avatar` varchar(300) DEFAULT NULL,
  `flower` int(11) DEFAULT NULL,
  `motto` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  to_done.user 的数据：~7 rows (大约)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`wxid`, `name`, `avatar`, `flower`, `motto`) VALUES
	('oGF_D5Q3nUw-tx_8k', '小土豆1', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('tx_MDzgrHqIg3o8k', '小土豆2', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('DzgrHqIg3o8k', '小土豆3', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('o8k', '小土豆4', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('oGF_D5Q3rHqIg3o8k', '小土豆5', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('-HqIg3o8k', '小土豆6', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, NULL),
	('oGF_D5Q3nUw-tx_MDzgrHqIg3o8k', '吃饭', 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJgFxYzj6DKCr9KSjJdbR24njRHV1EKrwWQo0ZhwZgB7icavFibfsjwN3u4bLZnVMJGALqH1ic5vHmDw/132', 0, 'undefined');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
